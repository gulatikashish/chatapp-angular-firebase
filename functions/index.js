const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp(functions.config().firebase)

exports.fcmSend = functions.database.ref('/messages/{userId}').onCreate(event => {
  console.log('event occured', event)
  console.log('event data', event.data.val().userId)
  const message = event.data.val()
  const userId = event.data.val().userId
  const payload = {
    notification: {
      title: 'aaa',
      body: 'new message',
      icon: 'https://placeimg.com/250/250/people'
    }
  }
  admin
    .database()
    .ref(`/fcmTokens/${userId}`)
    .once('value')
    .then(token => {
      console.log('token', token.val())
      token.val()
    })
    .then(userFcmToken => {
      console.log('userFcmToken', userFcmToken)
      return admin.messaging().sendToDevice(userFcmToken, payload)
    })
    .then(res => {
      console.log('Sent Successfully', res)
    })
    .catch(err => {
      console.log('error', err)
    })
})
