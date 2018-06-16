import firebase from '../../utils/firebase'

import {
  ADD_MESSAGE,
  DELETE_ALL_MESSAGES
} from './actionTypes'

export const fetchMessages = (match_id) => {
  return (dispatch) => {
    const messagesRef = firebase.database().ref(`messages/${match_id}`).orderByChild('createdAt')
    messagesRef.on('child_added', (snap) => {
      dispatch(addMessage({ id: snap.key, ...snap.val() }))
    })
    return messagesRef
  }
}

export const sendMessage = (match_id, message) => {
  return (dispatch) => {
    const updates = {}
    const key = firebase.database().ref().child('messages').push().key
    message._id = key
    updates[`messages/${match_id}/${key}`] = message
    firebase.database().ref().update(updates)
  }
}

export const addMessage = (match) => ({ type: ADD_MESSAGE, payload: match })
export const deleteAllMessages = () => ({ type: DELETE_ALL_MESSAGES, payload: {} })