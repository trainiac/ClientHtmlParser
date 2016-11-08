import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import ImageSlideShow from './ImageSlideShow'
import { girdle } from '../utils/index'
import * as fromUrl from '../stores/selectors/url'
import * as fromUrlImages from '../stores/selectors/images'


const styles = girdle({
  container: {
    display: 'flex',
    marginTop: '1em'
  }
})

function UrlMetaInfo(props) {

  let content

  if (
    props.isRequestingUrl ||
    props.isRequestingImages
  ) {

    content = <h2> Loading Url Data </h2>

  } else if (
    props.urlError ||

      !props.images.length &&
      !props.title

  ) {

    content = <h2> Yeah... this one aint gonna work </h2>

  } else {

    content = (
      <div>
        <ImageSlideShow/>
        <h3>{props.title || 'Title'}</h3>
        <p>{props.description || 'Description'}</p>
      </div>
    )

  }

  return (
    <div {...styles.container()}>
      {content}
    </div>
  )

}

UrlMetaInfo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  images: PropTypes.arrayOf(PropTypes.object),
  urlError: PropTypes.object,
  isRequestingUrl: PropTypes.bool,
  isRequestingImages: PropTypes.bool
}

const mapStateToProps = state => ({
  title: fromUrl.getTitle(state),
  description: fromUrl.getDescription(state),
  images: fromUrlImages.getBest(state),
  urlError: fromUrl.getError(state),
  isRequestingUrl: fromUrl.getIsRequesting(state),
  isRequestingImages: fromUrlImages.getIsRequesting(state)
})

export default connect(mapStateToProps)(UrlMetaInfo)
