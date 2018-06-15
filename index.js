const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
port = 8000
router = express.Router()


app.use(function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    res.setHeader('Access-Control-Allow-Credentials', true)

    next()

})

const scheduleRouter = require('./routes/schedule')
const tasksRouter = require('./routes/tasks')

app.use('/api', router)
app.use('/api/schedule', scheduleRouter)
app.use('/api/tasks', tasksRouter)
app.listen(port)

console.log('Using port ' + port)
