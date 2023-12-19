const moment = require('moment')
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
    const { members, cards } = await _getBoardMembersAndCards(boardId)
    
    const allCardsCount = cards.length
    const doneCardsCount = cards.filter(card => card.status === 'done').length
    const progress = Math.round((doneCardsCount / allCardsCount) * 100) || 0

    result.members = members
    result.progress = progress
  }

  res.send(results)
}

async function getChartDetail (req, res) {
  const boardId = req.params.id
  const logsRaw = []
  
  const q = query(
    collection(db, 'logs'),
    where('boardId', '==', boardId)
  )
  
  const snapshot = await getDocs(q)
  snapshot.forEach(doc => {
    const data = doc.data()
    logsRaw.push(data)
  })

  const logsSorted = logsRaw.sort((a, b) => a.timestamp - b.timestamp)
  const logs = []
  logsSorted.forEach(log => {
    const logDate = moment(log.timestamp).format('DD-MM-YYYY')
    const isLogExist = logs.find(logFinal => logFinal.date === logDate)
    if (isLogExist) {
      isLogExist.point += log.point
    } else {
      logs.push({
        date: logDate,
        point: log.point
      })
    }
  })
  
  const { cards } = await _getBoardMembersAndCards(boardId)
  const totalPoint = cards.reduce((total, card) => total + card.point, 0)
  
  res.send({ totalPoint, logs })
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


module.exports = { getChart, getChartDetail }
