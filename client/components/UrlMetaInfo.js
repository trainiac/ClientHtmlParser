import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ImageSlideShow from './ImageSlideShow'
import { girdle } from '../utils/index'
import { getDescription, getTitle } from '../stores/selectors/url'


const styles = girdle({
  container: {
    display: 'block'
  }
})

function UrlMetaInfo(props) {

  return (
    <div {...styles.container()}>
      <ImageSlideShow/>
      <h3>{props.title || 'Title'}</h3>
      <p>{props.description || 'Description'}</p>
    </div>
  )

}

UrlMetaInfo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}

const mapStateToProps = state => ({
  title: getTitle(state),
  description: getDescription(state)
})

export default connect(mapStateToProps)(UrlMetaInfo)
