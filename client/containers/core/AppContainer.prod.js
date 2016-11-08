import React, { PropTypes } from 'react'

export default function AppContainer(props) {

  return (
    <div id='appContainer'>
      {props.children}
    </div>
  )

}

AppContainer.propTypes = {
  children: PropTypes.node
}
