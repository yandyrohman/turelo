const functions = require('firebase-functions')
const express = require('express')

const { postLogin } = require('./services/user')
const { getEmployee, createEmployee, updateEmployee, deleteEmployee } = require('./services/employee')
const { getBoard, createBoard, getBoardDetail, updateBoard, deleteBoard } = require('./services/board')
const { getCard, createCard, updateCard, updateStatusCard, updateProofCard, deleteCard, assignCard } = require('./services/kanban')
const { getChart, getChartDetail } = require('./services/chart')

const app = express()

app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})

app.get('/', (req, res) => res.send('service running'))

app.post('/login', postLogin)

app.get('/employee', getEmployee)
app.post('/employee', createEmployee)
app.put('/employee/:id', updateEmployee)
app.delete('/employee/:id', deleteEmployee)

app.get('/board', getBoard)
app.get('/board/:id', getBoardDetail)
app.put('/board/:id', updateBoard)
app.post('/board', createBoard)
app.delete('/board/:id', deleteBoard)

app.get('/card', getCard)
app.post('/card', createCard)
app.put('/card/:id', updateCard)
app.put('/card/:id/status', updateStatusCard)
app.put('/card/:id/proof', updateProofCard)
app.put('/card/:id/assign', assignCard)
app.delete('/card/:id', deleteCard)

app.get('/chart', getChart)
app.get('/chart/:id', getChartDetail)

app.listen(8080, () => console.log('running on port 8080'))

exports.app = functions.https.onRequest(app)