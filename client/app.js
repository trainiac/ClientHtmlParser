import React from 'react'
import { render } from 'react-dom'
import { browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import configureStore from './stores/configureStore'
import Root from './containers/core/Root'
import AppContainer from './containers/core/AppContainer'

const store = configureStore()
const history = syncHistoryWithStore(browserHistory, store)

render(
  <AppContainer>
    <Root
      store={store}
      history={history}
    />
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot) {

  module.hot.accept('./containers/core/Root', () => {

    const RootContainer = require('./containers/core/Root').default // eslint-disable-line global-require

    render(
      <AppContainer>
        <RootContainer
          store={store}
          history={history}
        />
      </AppContainer>,
      document.getElementById('root')
    )

  })

}
