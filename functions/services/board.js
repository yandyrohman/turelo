const db = require('./db')
const { collection, addDoc, getDocs, setDoc, getDoc, doc, query, where, deleteDoc } = require('firebase/firestore')

async function getBoard (req, res) {
  const results = []
  const snapshot = await getDocs(collection(db, 'boards'))
  snapshot.forEach(doc => results.push({
    id: doc.id,
    ...doc.data()
  }))

  for await (const result of results) {
    const boardId = result.id
    const { members } = await _getBoardMembersAndCards(boardId)
    result.members = members
  }

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

async function updateBoard (req, res) {
  const id = req.params.id
  const { picture, name } = req.body
  await setDoc(doc(db, 'boards', id), { picture, name })
  res.send(null)
}

async function deleteBoard (req, res) {
  const id = req.params.id
  await deleteDoc(doc(db, 'boards', id))
  res.send(null)
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

module.exports = { getBoard, createBoard, getBoardDetail, updateBoard, deleteBoard }