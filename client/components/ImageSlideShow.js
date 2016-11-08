import React, { PropTypes, PureComponent } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash/fp'
import styles, * as styleParams from './ImageSlideShow.styles'
import * as fromUrlImages from '../stores/selectors/images'


class ImageSlideShow extends PureComponent {

  constructor(props) {

    super(props)
    this.handlePrevClick = this.handlePrevClick.bind(this)
    this.handleNextClick = this.handleNextClick.bind(this)
    this.state = {
      reelIndex: 0
    }

  }

  handlePrevClick() {

    if (!this.atFirstImage()) {

      this.setState(prevState => ({
        reelIndex: prevState.reelIndex - 1
      }))

    }


  }

  handleNextClick() {

    if (!this.atLastImage()) {

      this.setState(prevState => ({
        reelIndex: prevState.reelIndex + 1
      }))

    }

  }

  atFirstImage() {

    return this.state.reelIndex === 0

  }

  atLastImage() {

    return this.state.reelIndex === this.props.images.length - 1

  }

  render() {

    const reelStyles = {
      left: this.state.reelIndex * styleParams.imageDimension * -1
    }

    return (
      <div {...styles.container()}>
        <a
          onClick={this.handlePrevClick}
          {...styles.prevBtn(this.atFirstImage())}
        >
          {'<'}
        </a>
        <div {...styles.mask()}>
          <div style={reelStyles} {...styles.reel()}>
            {this.props.images.map(image =>
              <div
                key={_.uniqueId(image.alt || image.title)}
                {...styles.imageWrapper()}
              >
                <img
                  {...styles.image()}
                  alt={image.alt || image.title}
                  title={image.title || image.alt}
                  src={image.src}
                />
              </div>
            )}
          </div>
        </div>
        <a
          onClick={this.handleNextClick}
          {...styles.prevBtn(this.atLastImage())}
        >
          {'>'}
        </a>
      </div>
    )

  }

}

ImageSlideShow.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = state => ({
  images: fromUrlImages.getBest(state)
})

export default connect(mapStateToProps)(ImageSlideShow)
