import _ from 'lodash/fp'
import { requestUrl } from './url'
import { getBestImages } from './images'
import { parseJSON } from './utils/fetch'

let testUrlIndex = -1

const getDescription = _.flow(
  _.prop('meta'),
  _.filter(['name', 'description']),
  _.map('content'),
  _.head
)

const getTitle = results => {

  let title


  if (results.title === null) {

    title = '!None!'

  } else if (typeof results.title === 'object') {

    title = results.title.content

  } else {

    title = results.title

  }

  title = title || '!None!'

  return title.replace(/[\r\n]/g, '')

}

const logResults = (args) => {

  const [ url, results, images ] = args
  const description = getDescription(results) || '!None!'
  const bestImageSrcs = _.map(_.prop('src'), getBestImages(images))
  const title = getTitle(results)

  return fetch('/api/results/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title,
      description,
      imageSrcs: bestImageSrcs,
      url,
      number: testUrlIndex
    })
  })

}

const verifyUrl = ({ url }) => {

  if (url) {

    return url

  }

  throw new Error('No more urls')

}

const getNextUrl = () => {

  testUrlIndex += 1

  return fetch(`/api/results/${testUrlIndex}`)
           .then(parseJSON)
           .then(verifyUrl)
           .then(requestUrl)
           .then(logResults)
           .then(getNextUrl)
           .catch(error => {

             if (error && error.message === 'No more urls') {

               console.log(error.message)

             } else {

               getNextUrl()

             }

           })

}

getNextUrl()

