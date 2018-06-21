import {
  ADD_MESSAGE,
  DELETE_ALL_MESSAGES
} from './actionTypes'

const initialState = []

const messages = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      return [...state, action.payload].sort(
        (a, b) => {
          return (a.createdAt < b.createdAt) ? 1 : ((b.createdAt < a.createdAt) ? -1 : 0)
        }
      ) 

    case DELETE_ALL_MESSAGES:
      return initialState

    default:
      return state
  }
}

export default messages