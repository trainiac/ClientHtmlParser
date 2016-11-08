import React, { PropTypes } from 'react'
import { girdle } from '../utils/index'

const styles = girdle({
  wrapper: {
    display: 'flex',
    height: '100%'
  }
})

export default function Wrapper(props) {

  return (
    <div {...styles.wrapper()}>
      {props.children}
    </div>
  )

}

Wrapper.propTypes = {
  children: PropTypes.node
}
