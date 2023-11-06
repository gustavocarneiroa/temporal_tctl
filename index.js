const express = require('express')
const app = express()
const { startWorkflow, initTemporal } = require('./temporal.service')
const bodyParser = require('body-parser')
const crypto = require('crypto');
require('dotenv').config()
initTemporal()

const port = process.env.PORT
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (_, res) => res.redirect('/temporal'))
app.get('/temporal', (_, res) => res.render('index', { environments: global.environments}))

app.post('/temporal', async (req, res) => {
    const { environment, workflowId, workflowType, taskqueue, input, startNew, timeout } = req.body;
    const _id = crypto.randomBytes(20).toString('hex');
    const inputs = []
    const options = {
        environment,
        taskQueue: taskqueue,
        workflowType,
        timeout,
        workflowId: workflowId + `${!!+startNew ? "-" + _id : ''}` 
    }
    if(!Array.isArray(input)) {
        inputs.push(normalizeObjectId(input))
    } else {
        inputs.push(...input.map( i => normalizeObjectId(i)))
    }
    const {cli, stderr, stdout} = await startWorkflow(options, ...inputs)

    if(!stderr) {
        const settedEnvironment  = global.environments.find((env) => env.environment == options.environment)
        return res.render("successful", {
            data: stdout.trim(),
            cli: cli,
            temporal_client: settedEnvironment.ui,
            namespace: settedEnvironment.namespace,
            workflow_id: workflowId + `${!!+startNew ? "-" + _id : ''}`,
            run_id: stdout.split('\n')?.[2]?.split("RunId")[1]?.trim() ?? ""
        });
    }
    
    return res.render('error', {
        data: stderr.trim(),
        cli: cli,
    })

})

app.listen(port, () => console.log("Server is running at port " + port))

function normalizeObjectId(jsonString) {
    if(!jsonString) return
    return jsonString.replace(/ObjectId\("([^"]+)"\)/g, '"$1"');
}