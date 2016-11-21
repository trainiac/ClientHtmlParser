import _ from 'lodash/fp'
import fetchJsonp from 'fetch-jsonp'
import { checkResponseStatus, parseJSON } from './utils/fetch'
import { requestImages } from './images'

const getYql = url => {

  const select = `select * from html where url="${url}"`
  const xpath = 'xpath="//html//head//title|//html//head//meta|//html//body//img"'
  const query = encodeURIComponent(
    `${select} and ${xpath} and compat="html5"`
  )


  return `https://query.yahooapis.com/v1/public/yql?q=${query}&format=json`

}

export const requestUrl = url => {

  const yql = getYql(url)

  return (
    fetchJsonp(yql)
      .then(checkResponseStatus)
      .then(parseJSON)
      .then(yqlResponse => {

        let images
        let urlMetadata

        if (!_.prop('query.results', yqlResponse)) {

          images = []
          urlMetadata = {
            title: null,
            meta: []
          }

        } else {

          urlMetadata = yqlResponse.query.results
          images = requestImages(url, urlMetadata.img, urlMetadata.meta)

        }

        return Promise.all([
          url,
          urlMetadata,
          images
        ])

      })
  )

}
