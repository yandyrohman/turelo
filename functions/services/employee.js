const db = require('./db')
const { collection, addDoc, getDocs, setDoc, deleteDoc, doc } = require('firebase/firestore')

async function getEmployee (req, res) {
  const results = []
  const snapshot = await getDocs(collection(db, 'employees'))
  snapshot.forEach(doc => results.push({
    id: doc.id,
    ...doc.data()
  }))
  res.send(results)
}

async function createEmployee (req, res) {
  const { picture, email, password, name, position, salary, status, role } = req.body
  await addDoc(collection(db, 'employees'), { picture, email, password, name, position, salary, status, role })
  res.send(null)
}

async function updateEmployee (req, res) {
  const id = req.params.id
  const { picture, email, password, name, position, salary, status, role } = req.body
  await setDoc(doc(db, 'employees', id), { picture, email, password, name, position, salary, status, role })
  res.send(null)
}

async function deleteEmployee (req, res) {
  const id = req.params.id
  console.log(id)
  await deleteDoc(doc(db, 'employees', id))
  res.send(null)
}

module.exports = { getEmployee, createEmployee, updateEmployee, deleteEmployee }
