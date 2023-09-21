const { spawn } = require('child_process');
const ms = require("ms");

function startWorkflow(options = {}, ...inputList) {   
    inputList = inputList.filter(i => i)
    const inputsMap = inputList.map(input => {
        return ["--input", input]
    }).flat()
    const initial_arguments = process.env.INITIAL_ARGUMENTS ? process.env.INITIAL_ARGUMENTS.split(',')  : []

    const execution_timeout = []
    if(!!(options.timeout && options.timeout.trim())) {
        execution_timeout.push('--execution_timeout')
        if(isNaN(options.timeout)) {
            execution_timeout.push(ms(options.timeout) / 1000)
        } else {
            execution_timeout.push(options.timeout / 1000)
        }
    }

    const _arguments = [
        ...initial_arguments,
        'tctl',
        '--ns', options.namespace,
        'workflow', 'start',
        '--workflow_id', options.workflowId,
        '--taskqueue', options.taskQueue,
        '--workflow_type', options.workflowType,
        ...execution_timeout,
        ...inputsMap,
    ].filter(f => f);

    return {
        spawn: spawn(process.env.MAIN_PROCESS, _arguments),
        cli: [process.env.MAIN_PROCESS, ..._arguments].join(' ')
    };
}

module.exports = {
    startWorkflow
}