import _ from 'lodash/fp'
import { isValidElement } from 'react'
import { girdleGlobals } from './girdle'
import HttpStatus from 'http-status-codes'

export const checkResponseStatus = response => {

  if (
    response.ok ||
      response.status >= HttpStatus.OK &&
      response.status < HttpStatus.MULTIPLE_CHOICES

  ) {

    return response

  }

  const error = new Error(response.statusText)

  error.response = response
  throw error

}

export const headContentProp = _.flow(
  _.map('content'),
  _.head
)

export const parseJSON = response =>
   response.json()


export const ref = (context, propName) =>
   ({
     ref: el => context[propName] = el // eslint-disable-line no-return-assign
   })

export const isTypeComponent = type => child =>
  isValidElement(child) && _.get('type.displayName')(child) === type

export const trace = (tag, func) => input => {

  const value = func(input)

  console.log(tag, value)  // eslint-disable-line no-console

  return value

}

export const girdle = girdleGlobals({
  clearfix: {
    ':after': {
      visibility: 'hidden',
      display: 'block',
      fontSize: 0,
      content: '" "',
      clear: 'both',
      height: 0
    }
  },
  disabled: {
    opacity: 0.5
  },
  flatBtn: {
    outline: 'none',
    textAlign: 'center',
    fontSize: '12px',
    lineHeight: '16px',
    fontWeight: 'normal',
    padding: '4px 10px',
    borderRadius: '3px',
    backgroundClip: 'padding-box',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    textDecoration: 'none !important',
    color: '#333333',
    display: 'inline-block',
    border: 'none',
    position: 'relative',
    textShadow: 'none'
  }
})
