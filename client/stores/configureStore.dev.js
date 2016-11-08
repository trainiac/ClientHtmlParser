import { createStore } from 'redux'
import rootReducer from './reducers'
import storeEnhancer from './enhancers/enhancer'

export default function configureStore() {

  const store = createStore(rootReducer, storeEnhancer)

  if (module.hot) {

    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers').default) // eslint-disable-line global-require
    )

  }


  return store

}
