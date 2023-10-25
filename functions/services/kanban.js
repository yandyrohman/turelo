const db = require('./db')
const { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } = require('firebase/firestore')

async function getCard (req, res) {
  const results = []
  const snapshot = await getDocs(collection(db, 'cards'))
  snapshot.forEach(doc => results.push({
    id: doc.id,
    ...doc.data()
  }))
  res.send(results)
}

async function createCard (req, res) {
  const { title, description, point, status } = req.body
  const timestamp = Date.now()
  await addDoc(collection(db, 'cards'), { title, description, point, status, timestamp })
  res.send(null)
}

async function updateStatusCard (req, res) {
  const id = req.params.id
  const { status } = req.body
  await updateDoc(doc(db, 'cards', id), { status })
  res.send(null)
}

module.exports = { getCard, createCard, updateStatusCard }