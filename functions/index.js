const functions = require('firebase-functions')
const express = require('express')

const { getEmployee, createEmployee, updateEmployee, deleteEmployee } = require('./services/employee')
const { getBoard, createBoard } = require('./services/board')
const { getCard, createCard, updateStatusCard } = require('./services/kanban')

const app = express()

app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

app.get('/', (req, res) => res.send('service running'))

app.get('/employee', getEmployee)
app.post('/employee', createEmployee)
app.put('/employee/:id', updateEmployee)
app.delete('/employee/:id', deleteEmployee)

app.get('/board', getBoard)
app.post('/board', createBoard)

app.get('/card', getCard)
app.post('/card', createCard)
app.put('/card/:id/status', updateStatusCard)

app.listen(8080, () => console.log('running on port 8080'))

exports.app = functions.https.onRequest(app)