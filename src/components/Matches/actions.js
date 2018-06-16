import firebase from '../../utils/firebase'

import {
  ADD_MATCH,
  UPDATE_MATCH,
  DELETE_ALL_MATCHES
} from './actionTypes'

export const fetchMatches = (account_id) => {
  return (dispatch) => {
    const matchesRef = firebase.database().ref().child('matches').orderByChild(`member_${account_id}`).equalTo(true)
    matchesRef.on('child_added', (snap) => {
      dispatch(addMatch({ id: snap.key, ...snap.val() }))
    })
    return matchesRef
  }
}

export const addMatch = (match) => ({ type: ADD_MATCH, payload: match })
export const updateMatch = (match) => ({ type: UPDATE_MATCH, payload: match })
export const deleteAllMatches = () => ({ type: DELETE_ALL_MATCHES, payload: {} })