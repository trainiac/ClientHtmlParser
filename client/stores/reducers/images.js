import { combineReducers } from 'redux'
import * as actions from '../../actions/constants'

const initialState = {
  isRequesting: false,
  elements: []
}

export const elements = (state = initialState.elements, action) => {

  switch (action.type) {
    case actions.REQUEST_IMAGES_RECEIVED:
      return action.imageElements
    default:
      return state
  }

}

const isRequesting = (state = initialState.isRequesting, action) => {

  switch (action.type) {
    case actions.REQUEST_IMAGES_RECEIVED:
      return false
    case actions.REQUEST_IMAGES_STARTING:
      return true
    default:
      return state
  }

}

export default combineReducers({
  elements,
  isRequesting
})
