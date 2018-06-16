import {
  SAVE_ACCOUNT,
  UPDATE_ACCOUNT,
  DELETE_ACCOUNT
} from './actionTypes'

const initialState = {}

const account = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ACCOUNT:
      return action.payload

    case UPDATE_ACCOUNT:
      return { ...state, ...action.payload }

    case DELETE_ACCOUNT:
      return initialState

    default:
      return state
  }
}

export default account