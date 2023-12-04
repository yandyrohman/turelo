const db = require('./db')
const { collection, getDocs, query, where } = require('firebase/firestore')

async function getChart (req, res) {
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


module.exports = { getChart }
