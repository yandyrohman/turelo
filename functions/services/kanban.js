const db = require('./db')
const { collection, addDoc, getDocs, setDoc, deleteDoc, doc } = require('firebase/firestore')

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
  await addDoc(collection(db, 'cards'), { title, description, point, status })
  res.send(null)
}

module.exports = { getCard, createCard }