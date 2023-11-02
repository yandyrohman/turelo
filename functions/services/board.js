const db = require('./db')
const { collection, addDoc, getDocs, getDoc, doc, query, where } = require('firebase/firestore')

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
  const boardId = req.params.id

  const snapshot = await getDoc(doc(db, 'boards', boardId))
  const { members, cards } = await _getBoardMembersAndCards(boardId)

  const boardDetail = {
    id: snapshot.id,
    ...snapshot.data(),
    members,
    cards
  }

  res.send(boardDetail)
}

async function _getBoardMembersAndCards (boardId) {
  const members = []
  const cards = []

  const q = query(
    collection(db, 'cards'),
    where('boardId', '==', boardId)
  )
  
  const snapshot = await getDocs(q)
  snapshot.forEach(doc => {
    const data = doc.data()
    data.assigns.forEach(assign => {
      const hasExist = !!members.find(m => m.id === assign.id)
      if (!hasExist) members.push(assign)
    })
    cards.push({
      id: doc.id,
      ...doc.data()
    })
  })

  return { members, cards }
}

module.exports = { getBoard, createBoard, getBoardDetail }