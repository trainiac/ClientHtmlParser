import _ from 'lodash/fp'
import * as actions from './constants'
import { headContentProp } from '../utils/index'
import Url from 'url'

const requestImagesStarting = () => ({
  type: actions.REQUEST_IMAGES_STARTING
})

const requestImagesReceived = imageElements => ({
  type: actions.REQUEST_IMAGES_RECEIVED,
  imageElements
})

const getOpenGraphImageSrc = _.flow(
  _.filter(['name', 'og:image']),
  headContentProp
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
    !_.endsWith('blank.gif')(src) &&
    !_.endsWith('blank.png')(src)
  )

}

const resolveUrl = url => image =>
   ({
     ...image,
     src: Url.resolve(url, image.src)
   })


const requestImages = (url, images, metaTags) => dispatch => {

  const openGraphImageSrc = getOpenGraphImageSrc(metaTags)
  let imagesToLoad = _.filter(isUsefulImage)(images)

  if (openGraphImageSrc) {

    imagesToLoad = [
      { src: openGraphImageSrc, isOpenGraph: true },
      ...imagesToLoad
    ]

  }

  imagesToLoad = _.map(resolveUrl(url))(imagesToLoad)

  dispatch(requestImagesStarting())

  return Promise
    .all(_.map(loadImage)(imagesToLoad))
    .then(imageElements =>
      dispatch(
        requestImagesReceived(imageElements)
      )
    )


}

export default requestImages
