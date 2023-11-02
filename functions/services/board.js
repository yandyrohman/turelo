const db = require('./db')
const { collection, addDoc, getDocs, setDoc, deleteDoc, doc } = require('firebase/firestore')

async function getBoard (req, res) {
  const results = []
  const snapshot = await getDocs(collection(db, 'boards'))
  snapshot.forEach(doc => results.push({
    id: doc.id,
    ...doc.data()
  }))
  res.send(results)
}

async function createBoard (req, res) {
  const { picture, name } = req.body
  await addDoc(collection(db, 'boards'), { picture, name })
  res.send(null)
}

async function getBoardDetail (req, res) {
  const members = []
  return members
}

module.exports = { getBoard, createBoard, getBoardDetail }