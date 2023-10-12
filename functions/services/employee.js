const db = require('./db')
const { collection, addDoc } = require('firebase/firestore')

async function createEmployee (req, res) {
  const { name, email, position, salary, status, role } = req.body
  await addDoc(collection(db, 'employees'), { name, email, position, salary, status, role })
  res.send(null)
}

module.exports = { createEmployee }