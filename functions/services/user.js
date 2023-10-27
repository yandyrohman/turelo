const db = require('./db')
const { collection, getDocs, where, query } = require('firebase/firestore')

async function postLogin (req, res) {
  const email = req.body.email
  const password = req.body.password
  const results = []

  const q = query(
    collection(db, 'employees'),
    where('email', '==', email),
    where('password', '==', password)
  )

  const snapshot = await getDocs(q)

  snapshot.forEach(doc => results.push({
    id: doc.id,
    ...doc.data()
  }))

  if (results.length) {
    const user = results[0]
    res.send({ success: true, user })
  } else {
    res.send({ success: false })
  }
}

module.exports = { postLogin }