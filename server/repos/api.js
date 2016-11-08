import fetch from 'node-fetch'
import fp from 'lodash/fp'
import url from 'url'


/*
  Functions that handle building API URLs
*/
const apiHost = 'https://api.com'
const getUrl = fp.curry((protocol, host, path, query) => url.format({
  protocol, host, path, query
}))
const getAPIEndpoint = Reflect.apply(getUrl, undefined, apiHost.split('://'))
const getSpecificAPIEndpoint = getAPIEndpoint('/action')

function callApi(endpoint) {

  return fetch(endpoint).then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {

      if (!response.ok) {

        throw new Error(`${json} ${response}`)

      }

      return {
        response,
        json
      }

    })

}

export const actionToObjects = fp.flow(
  query => ({ q: query })  // eslint-disable-line id-length
,
  getSpecificAPIEndpoint,
  callApi
)
