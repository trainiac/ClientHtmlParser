import React, { PropTypes } from 'react'
import { Provider } from 'react-redux'
import Routes from './Routes'
import DevTools from './DevTools'

export default function Root(props) {

  const { store, history } = props


  return (
    <Provider store={store}>
      <div id='devRoot'>
        <Routes history={history}/>
        <DevTools/>
      </div>
    </Provider>
  )

}

Root.propTypes = {
  store: PropTypes.object,
  history: PropTypes.object
}
