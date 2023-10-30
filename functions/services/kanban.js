const db = require('./db')
const { collection, addDoc, getDocs, getDoc, updateDoc, deleteDoc, doc } = require('firebase/firestore')

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
  await addDoc(collection(db, 'cards'), { title, description, point, status, timestamp, assigns: [] })
  res.send(null)
}

async function updateCard (req, res) {
  const id = req.params.id
  const { title, description, point } = req.body
  await updateDoc(doc(db, 'cards', id), { title, description, point })
  res.send(null)
}

async function updateStatusCard (req, res) {
  const id = req.params.id
  const { status } = req.body
  await updateDoc(doc(db, 'cards', id), { status })
  res.send(null)
}

async function deleteCard (req, res) {
  const id = req.params.id
  await deleteDoc(doc(db, 'cards', id))
  res.send(null)
}

async function assignCard (req, res) {
  const cardId = req.params.id
  const user = req.body.user
  const card = await _getOneCard(cardId)

  let newCardAssigneds

  const cardAssigneds = card.assigns
  const userAssigned = !!cardAssigneds.find(c => c.id === user.id)

  if (userAssigned) {
    newCardAssigneds = cardAssigneds.filter(c => c.id !== user.id)
  } else {
    newCardAssigneds = [user, ...cardAssigneds]
  }

  await updateDoc(doc(db, 'cards', cardId), { assigns: newCardAssigneds })

  res.send(null)
}

async function _getOneCard (id) {
  const snapshot = await getDoc(doc(db, 'cards', id))
  if (snapshot.exists()) {
    return snapshot.data()
  } else {
    return null
  }
}

module.exports = { getCard, createCard, updateCard, updateStatusCard, deleteCard, assignCard }