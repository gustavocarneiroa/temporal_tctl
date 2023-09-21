const express = require('express')
const app = express()
const { startWorkflow } = require('./tctl')
const bodyParser = require('body-parser')
const crypto = require('crypto');
require('dotenv').config()

const port = process.env.PORT
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (_, res) => res.redirect('/temporal'))
app.get('/temporal', (_, res) => res.render('index'))

app.post('/temporal', async (req, res) => {
    const { namespace, workflowId, workflowType, taskqueue, input, startNew, timeout } = req.body;
    const _id = crypto.randomBytes(20).toString('hex');
    const inputs = []
    const options = {
        namespace,
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
    const {cli, spawn: cli_process} = await startWorkflow(options, ...inputs)
    cli_process.stdout.on('data', (data) => {
        const dataBuffer = data.toString()
        if(dataBuffer.trim().toLowerCase().startsWith("error")) {
            return res.render("error", {
                data: dataBuffer,
                cli: cli,
            });
        }
        res.render("successful", {
            data: dataBuffer,
            cli: cli,
            temporal_client: process.env.TEMPORAL_CLIENT,
            namespace,
            workflow_id: workflowId + `${!!+startNew ? "-" + _id : ''}`,
            run_id: dataBuffer.split("run Id: ")[1] ? dataBuffer.split("run Id: ")[1].trim() : ""
        });
    });
    
    cli_process.stderr.on('data', (error) => {
        res.send('error', {
            data: error,
            cli: cli,
        })
    });
    
    cli_process.on('close', (code) => {
        console.log(`Process was closed with code: ${code}`);
    });
})

app.listen(port, () => console.log("Server is running at port " + port))

function normalizeObjectId(jsonString) {
    if(!jsonString) return
    return jsonString.replace(/ObjectId\("([^"]+)"\)/g, '"$1"');
}