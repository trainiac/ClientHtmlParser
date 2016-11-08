import fetchJsonp from 'fetch-jsonp'
import { checkResponseStatus, parseJSON } from '../utils/index'
import * as actions from './constants'
import requestImages from './images'


const requestUrlStarting = () => ({
  type: actions.REQUEST_URL_STARTING
})

const requestUrlFailed = requestError => ({
  type: actions.REQUEST_URL_FAILED,
  requestError
})

const requestUrlReceived = urlMetadata => ({
  type: actions.REQUEST_URL_RECEIVED,
  urlMetadata
})

const getYql = url => {

  const select = `select * from html where url="${url}"`
  const xpath = 'xpath="//html//head//title|//html//head//meta|//html//body//img"'
  const query = encodeURIComponent(
    `${select} and ${xpath} and compat="html5"`
  )


  return `http://query.yahooapis.com/v1/public/yql?q=${query}&format=json`

}

const requestUrl = url => dispatch => {

  const yql = getYql(url)

  dispatch(requestUrlStarting())

  return (
    fetchJsonp(yql)
      .then(checkResponseStatus)
      .then(parseJSON)
      .then(yqlResponse => {

        const urlMetadata = yqlResponse.query.results

        dispatch(
          requestUrlReceived(urlMetadata)
        )
        dispatch(
          requestImages(url, urlMetadata.img, urlMetadata.meta)
        )

      }).catch(requestError => dispatch(
        requestUrlFailed(requestError)
      ))
  )

}


export default requestUrl
