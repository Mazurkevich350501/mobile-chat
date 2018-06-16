import { createStore, applyMiddleware, combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import { AsyncStorage } from 'react-native'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import account from './components/Account/reducer'
import matches from './components/Matches/reducer'
import messages from './components/Messages/reducer'

const rootReducer = combineReducers({ account, matches, messages })
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  stateReconciler: autoMergeLevel2,
  whitelist: ['account']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
const middleware = [logger, thunk]

export default createStore(persistedReducer, {}, applyMiddleware(...middleware))
