const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
const ms = require("ms");
const fs = require('fs');

async function initTemporal() {
    const environments = []
    try {
        const configTemporalPath = process.env.CONFIG_TEMPORAL_PATH ?? "./.config.temporal"
        const rawData = fs.readFileSync(configTemporalPath);
        const temporalProcess = process.env.TEMPORAL_MAIN_PROCESS;
        const configTemporal = JSON.parse(rawData);
        environments.push(...configTemporal)
        for (const environment of environments) {
            await exec(`${temporalProcess} env set ${environment.environment}.namespace ${environment.namespace}`)
            console.log(`set ${environment.environment}.namespace ${environment.namespace}`);
            await exec(`${temporalProcess} env set ${environment.environment}.address ${environment.address}`)
            console.log(`set ${environment.environment}.address ${environment.address}`);
        }
        global.environments = environments;
    } catch (error) {
        console.error('Error @ .config.temporal file:', error);
    }

}

async function startWorkflow(options = {}, ...inputList) {   
    inputList = inputList.filter(i => i)
    const inputsMap = inputList.map(input => {
        return ["--input", convertToJsonString(input)]
    }).flat()

    const execution_timeout = []
    if(!!(options.timeout && options.timeout.trim())) {
        execution_timeout.push('--execution-timeout')
        if(isNaN(options.timeout)) {
            execution_timeout.push(ms(options.timeout) / 1000)
        } else {
            execution_timeout.push(options.timeout / 1000)
        }
    }
    const settedEnvironment  = global.environments.find((env) => env.environment == options.environment)
    if(!settedEnvironment) {
        throw new Error("Environment not found @ .config.temporal file.")
    }
    const _arguments = [
        'workflow', 'start',
        "--env", settedEnvironment.environment,
        '--namespace', settedEnvironment.namespace,
        '--workflow-id', options.workflowId,
        '--task-queue', options.taskQueue,
        '--type', options.workflowType,
        ...execution_timeout,
        ...inputsMap,
        
    ].filter(f => f);
    const cli = [process.env.TEMPORAL_MAIN_PROCESS, ..._arguments].join(' ')
    let stdout = null;
    let stderr = null;
    try {
        console.log("Executing CLI: " + cli);
        let { stdout: out, stderr: err } = await exec(cli)
        stdout = out;
        stderr = err;
    }
    catch (err) {
        stdout = null;
        console.log("Error processing TCTL:" + cli);
        console.error(err)
        stderr = `${err}`
    }
    return {
        stdout, 
        stderr,
        cli
    };
}

module.exports = {
    startWorkflow,
    initTemporal
}


function convertToJsonString(jsonString) {
    const jsonStringWithoutNewlines = jsonString.replace(/\n|\r/g, '').replace(/"/g, '\\"');
    return `"${jsonStringWithoutNewlines}"`;
}