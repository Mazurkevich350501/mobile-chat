import FacebookAuth from '../../utils/FacebookAuth'
import firebase from '../../utils/firebase'

import {
  SAVE_ACCOUNT,
  UPDATE_ACCOUNT,
  DELETE_ACCOUNT
} from './actionTypes'

export const login = () => {
  return (dispatch) => {
    return FacebookAuth.login(['public_profile', 'email']).then((data) => {
      const token = data.credentials.token
      const firebaseCredentials = firebase.auth.FacebookAuthProvider.credential(token)
      firebase.auth().signInAndRetrieveDataWithCredential(firebaseCredentials)
        .then((data) => {
          const userInfo = data.user
          if (data.additionalUserInfo.isNewUser) {
            const profile = data.additionalUserInfo.profile
            const newUser = { gender: profile.gender,
                              age: profile.age_range.min,
                              email: userInfo.email,
                              displayName: userInfo.displayName,
                              photoUrl: userInfo.photoURL }
            firebase.database().ref(`users/${userInfo.uid}`).set(newUser).then(() => {
              firebase.database().ref(`users/${userInfo.uid}`).once('value', (snap) => {
                dispatch(saveAccount({ id: userInfo.uid, ...snap.val() }))
              })
            })
          }
          firebase.database().ref(`users/${userInfo.uid}`).once('value', (snap) => {
            dispatch(saveAccount({ id: userInfo.uid, ...snap.val() }))
          })
        })
    })
  }
}

export const fetchAccount = (account_id) => {
  return (dispatch) => {
    return firebase.database().ref(`users/${account_id}`).once('value', (snap) => {
      dispatch(saveAccount({ id: account_id, ...snap.val() }))
    })
  }
}

export const logout = () => {
  return (dispatch) => {
    return FacebookAuth.logout().then(() => dispatch(deleteAccount()))
  }
}

export const saveAccount = (account) => ({ type: SAVE_ACCOUNT, payload: account })
export const updateAccount = (account) => ({ type: UPDATE_ACCOUNT, payload: account })
export const deleteAccount = () => ({ type: DELETE_ACCOUNT, payload: {} })