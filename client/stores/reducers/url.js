import { combineReducers } from 'redux'
import * as actions from '../../actions/constants'
import images from './images'


const initialState = {
  title: '',
  metaTags: [],
  isRequesting: false,
  requestError: null
}

export const title = (state = initialState.title, action) => {

  switch (action.type) {
    case actions.REQUEST_URL_RECEIVED:
      return action.urlMetadata.title
    default:
      return state
  }

}

export const metaTags = (state = initialState.metaTags, action) => {

  switch (action.type) {
    case actions.REQUEST_URL_RECEIVED:
      return action.urlMetadata.meta
    default:
      return state
  }

}

export const isRequesting = (state = initialState.isRequesting, action) => {

  switch (action.type) {
    case actions.REQUEST_URL_RECEIVED:
    case actions.REQUEST_URL_FAILED:
      return false
    case actions.REQUEST_URL_STARTING:
      return true
    default:
      return state
  }

}

const requestError = (state = initialState.requestError, action) => {

  switch (action.type) {
    case actions.REQUEST_URL_FAILED:
      return action.requestError
    case actions.REQUEST_URL_RECEIVED:
    case actions.REQUEST_URL_STARTING:
      return null
    default:
      return state
  }

}

export default combineReducers({
  title,
  metaTags,
  images,
  isRequesting,
  requestError
})
