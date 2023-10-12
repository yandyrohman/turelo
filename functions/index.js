const functions = require('firebase-functions')
const express = require('express')

const { createEmployee } = require('./services/employee')

const app = express()

app.use(express.json())
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', (req, res) => res.send('service running'))

app.post('/employee', createEmployee)

app.listen(8080, () => console.log('running on port 8080'))

exports.app = functions.https.onRequest(app)