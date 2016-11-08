import { combineReducers } from 'redux'
import { routerReducer as routing } from 'react-router-redux'
import url from './url'


const rootReducer = combineReducers({
  routing,
  url
})

export default rootReducer
