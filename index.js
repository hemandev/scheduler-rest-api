const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
port = 8000
router = express.Router()


app.use(function(req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
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
