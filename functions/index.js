const functions = require('firebase-functions')
const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('halo kawan')
})

exports.app = functions.https.onRequest(app)