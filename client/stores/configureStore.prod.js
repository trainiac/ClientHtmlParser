import { createStore } from 'redux'
import rootReducer from './reducers'
import storeEnhancer from './enhancers/enhancer'

export default function configureStore() {

  return createStore(rootReducer, storeEnhancer)

}
