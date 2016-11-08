import _ from 'lodash/fp'
import round from 'lodash/round'

const minSquareness = 0.66
const imageCountToReturn = 10
const thousandthPrecision = 3

const imageSize = imageEl => imageEl.height * imageEl.width

const imageCalculations = imageEl => {

  if (!imageEl) {

    return {
      squareness: 0
    }

  }

  const size = imageSize(imageEl)

  let squareness

  if (imageEl.height > imageEl.width) {

    squareness = round(imageEl.width / imageEl.height, thousandthPrecision)
    console.log(imageEl.width, imageEl.height, size, squareness)

  } else if (imageEl.height < imageEl.width) {

    squareness = round(imageEl.height / imageEl.width, thousandthPrecision)
    console.log(imageEl.height, imageEl.width, size, squareness)
  } else {

    squareness = 1

  }

  return {
    size,
    squareness
  }

}

const isSquarish = _.flow(
  imageCalculations,
  _.prop('squareness'),
  _.lte(minSquareness)
)

const sortBestImages = _.flow(
  _.filter(isSquarish),
  _.orderBy(imageSize, 'desc')
)

export const getBestImages = state =>
  _.flow(
    sortBestImages,
    _.take(imageCountToReturn)
  )(state.url.images.elements)
