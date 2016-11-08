import React, { PropTypes } from 'react'
import { Router, Route, IndexRoute } from 'react-router'
import UrlParserPage from '../UrlParserPage'
import Wrapper from '../Wrapper'

export default function Routes(props) {

  const { history } = props

  return (
    <Router history={history}>
      <Route path='/' component={Wrapper}>
        <IndexRoute component={UrlParserPage}/>
      </Route>
    </Router>
  )

}

Routes.propTypes = {
  history: PropTypes.object
}
