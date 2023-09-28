const util = require('node:util');
const exec = util.promisify(require('node:child_process').exec);
const ms = require("ms");

async function initTemporal(namespace, server) {
    await exec(`${process.env.TEMPORAL_MAIN_PROCESS} env set prod.namespace ${namespace}`)
    await exec(`${process.env.TEMPORAL_MAIN_PROCESS} env set prod.address ${server}`)
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

    const _arguments = [
        'workflow', 'start',
        "--env", "prod",
        '--namespace', options.namespace,
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