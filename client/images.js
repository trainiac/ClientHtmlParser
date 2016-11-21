import Url from 'url'
import round from 'lodash/round'
import _ from 'lodash/fp'
// IMAGES

const minSquareness = 0.666
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

  } else if (imageEl.height < imageEl.width) {

    squareness = round(imageEl.height / imageEl.width, thousandthPrecision)

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


const getOpenGraphImageSrc = _.flow(
  _.filter(['name', 'og:image']),
  _.prop('content'),
  _.head
)

const loadImage = imgAttrs =>
  new Promise(resolve => {

    const image = document.createElement('img')

    image.onload = () => resolve(image)
    image.onerror = () => resolve(null)
    image.src = imgAttrs.src
    image.isOpenGraph = imgAttrs.isOpenGraph

  })

const isUsefulImage = image => {

  const src = image.src


  return (
    src &&
    !_.contains('sprites')(src) &&
    !_.endsWith('.gif')(src) &&
    !_.endsWith('blank.png')(src) &&
    !_.endsWith('clear.png')(src) &&
    !_.endsWith('spacer.png')(src)
  )

}

const resolveUrl = url => image =>
   ({
     ...image,
     src: Url.resolve(url, image.src)
   })


export const requestImages = (url, images, metaTags) => {

  const openGraphImageSrc = getOpenGraphImageSrc(metaTags)
  let imagesToLoad = _.filter(isUsefulImage)(images)

  if (openGraphImageSrc) {

    imagesToLoad = [
      { src: openGraphImageSrc, isOpenGraph: true },
      ...imagesToLoad
    ]

  }

  imagesToLoad = _.map(resolveUrl(url))(imagesToLoad)

  return Promise.all(_.map(loadImage)(imagesToLoad))
}

export const getBestImages = _.flow(
  _.filter(isSquarish),
  _.orderBy(imageSize, 'desc'),
  _.take(5)
)