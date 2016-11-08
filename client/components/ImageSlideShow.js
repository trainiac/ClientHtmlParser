import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash/fp'
import { girdle } from '../utils/index'
import { getBestImages } from '../stores/selectors/images'

const styles = girdle({
  container: {
    display: 'block'
  }
})

function ImageSlideShow(props) {

  return (
    <div {...styles.container()}>
      {props.images.map(image =>

        <img
          key={_.uniqueId(image.alt || image.title)}
          alt={image.alt || image.title}
          title={image.title || image.alt}
          src={image.src}
        />

      )}
    </div>
  )

}

ImageSlideShow.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = state => ({
  images: getBestImages(state)
})

export default connect(mapStateToProps)(ImageSlideShow)
