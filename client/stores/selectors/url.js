import _ from 'lodash/fp'
import { headContentProp } from '../../utils/index'

const getMetaDescription = _.flow(
  _.filter(['name', 'description']),
  headContentProp
)

export const getDescription = state =>
   _.flow(
    getMetaDescription
  )(state.url.metaTags)

export const getTitle = state => state.url.title

export const getIsRequesting = state => state.url.isRequesting
