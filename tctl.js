const { spawn } = require('child_process');
function startWorkflow(options = {}, ...inputList) {   
    inputList = inputList.filter(i => i)
    const inputsMap = inputList.map(input => {
        return ["--input", input]
    }).flat()

    const initial_arguments = process.env.INITIAL_ARGUMENTS ? process.env.INITIAL_ARGUMENTS.split(',')  : []
    const _arguments = [
        ...initial_arguments,
        'tctl',
        '--ns', options.namespace || "bsp",
        'workflow', 'start',
        '--workflow_id', options.workflowId,
        '--taskqueue', options.taskQueue,
        '--workflow_type', options.workflowType,
        '--execution_timeout', '3600',
        ...inputsMap,
    ].filter(f => f);

    return spawn(process.env.MAIN_PROCESS, _arguments);
}

module.exports = {
    startWorkflow
}