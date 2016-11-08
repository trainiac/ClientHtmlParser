import * as API from '../repos/api'
import fp from 'lodash/fp'

function doSomeMoreWork(json) {

  return json

}

export const actionToObjects = fp.flow(
  API.actionToObjects,
  doSomeMoreWork
)

