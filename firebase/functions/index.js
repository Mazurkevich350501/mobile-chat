const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

const ref = admin.database().ref()

exports.createUserIndex = functions.database.ref('users/{userId}').onWrite(event => {
  const user = event.data.val()
  const newGenderRef = ref.child(`${user.gender}/${event.params.userId}`)
  return newGenderRef.set(user)
})

exports.createUserShowAttributes = functions.database.ref('users/{userId}').onCreate(event => {
  return admin.database().ref('users').once('value',(snap) => {
    const users = snap.val()
    const newUsers = {}
    const userId = event.params.userId

    for(var key in users) {
      newUsers[`users/${userId}/show_${key}`] = true
      newUsers[`users/${key}/show_${userId}`] = true
    }

    ref.update(newUsers)
  })
})

exports.createLastMessage = functions.database.ref('messages/{match_id}/{message_id}').onWrite(event => {
  const message = event.data.val()
  const newMatch = {}
  newMatch[`couplesCouples/${event.params.match_id}/lastMessage`] = message.text
  return ref.update(newMatch)
})