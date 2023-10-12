const db = require('./db')
const { collection, addDoc, getDocs } = require('firebase/firestore')

async function getEmployee (req, res) {
  const results = []
  const snapshot = await getDocs(collection(db, 'employees'))
  snapshot.forEach(doc => results.push(doc.data()))
  res.send(results)
}

async function createEmployee (req, res) {
  const { picture, email, password, name, position, salary, status, role } = req.body
  await addDoc(collection(db, 'employees'), { picture, email, password, name, position, salary, status, role })
  res.send(null)
}

module.exports = { getEmployee, createEmployee }