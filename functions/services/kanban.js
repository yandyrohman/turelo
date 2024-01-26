const db = require('./db')
const { collection, addDoc, setDoc, getDocs, getDoc, updateDoc, deleteDoc, doc, query, where } = require('firebase/firestore')

async function getCard (req, res) {
  const results = []
  const boardId = req.query.boardId

  const q = query(
    collection(db, 'cards'),
    where('boardId', '==', boardId),
  )

  const snapshot = await getDocs(q)
  snapshot.forEach(doc => results.push({
    id: doc.id,
    ...doc.data()
  }))
  res.send(results)
}

async function createCard (req, res) {
  const { title, description, point, status, boardId } = req.body
  const timestamp = Date.now()
  await addDoc(collection(db, 'cards'), { title, description, point, status, timestamp, boardId, assigns: [] })
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
  await _createOrDeleteLog(id, status)
  await updateDoc(doc(db, 'cards', id), { status })
  res.send(null)
}

async function updateProofCard (req, res) {
  const id = req.params.id
  const { proofUrl } = req.body
  await updateDoc(doc(db, 'cards', id), { proofUrl })
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

async function _createOrDeleteLog (cardId, newStatus) {
  const card = await _getOneCard(cardId)
  const oldStatus = card.status

  if (oldStatus !== 'done' && newStatus === 'done') {
    const boardId = card.boardId
    const point = card.point
    const timestamp = Date.now()
    await setDoc(doc(db, 'logs', cardId), { boardId, point, timestamp })
  }

  if (oldStatus === 'done' && newStatus !== 'done') {
    await deleteDoc(doc(db, 'logs', cardId))
  }
}

module.exports = { getCard, createCard, updateCard, updateStatusCard, updateProofCard, deleteCard, assignCard }