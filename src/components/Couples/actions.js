import firebase from '../../utils/firebase'

import {
  ADD_MATCH,
  UPDATE_MATCH,
  DELETE_ALL_COUPLES
} from './actionTypes'

export const fetchCouples = (account_id) => {
  return (dispatch) => {
    const couplesRef = firebase.database().ref().child('couples').orderByChild(`member_${account_id}`).equalTo(true)
    couplesRef.on('child_added', (snap) => {
      dispatch(addMatch({ id: snap.key, ...snap.val() }))
    })
    return couplesRef
  }
}

export const addMatch = (match) => ({ type: ADD_MATCH, payload: match })
export const updateMatch = (match) => ({ type: UPDATE_MATCH, payload: match })
export const deleteAllCouples = () => ({ type: DELETE_ALL_COUPLES, payload: {} })