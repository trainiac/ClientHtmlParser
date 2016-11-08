import { girdle } from '../utils/index'

export const imageDimension = 100
const imagePadding = 10
const maxImageCount = 10

const btn = {
  cursor: 'pointer',
  verticalAlign: 'middle',
  getState(isDisabled) {

    return [
      isDisabled && 'disabled'
    ]

  },
  helpers: [ 'flatBtn' ]
}

const styles = girdle({
  container: {
    width: '10em'
  },
  mask: {
    display: 'inline-block',
    overflow: 'hidden',
    position: 'relative',
    width: imageDimension,
    height: imageDimension,
    verticalAlign: 'middle'
  },
  reel: {
    transition: 'left 0.2s ease-out',
    position: 'absolute',
    top: 0,
    left: 0,
    width: imageDimension * maxImageCount,
    height: imageDimension
  },
  imageWrapper: {
    height: imageDimension,
    width: imageDimension,
    display: 'inline-flex',
    verticalAlign: 'middle'
  },
  image: {
    maxWidth: imageDimension - imagePadding,
    maxHeight: imageDimension - imagePadding,
    margin: 'auto'
  },
  prevBtn: { ...btn },
  nextBtn: { ...btn }
})

export default styles