import express from 'express'
import fs from 'fs'
import Url from 'url'
import path from 'path'
import WishParser, { cleanWish } from './WishParser'
import _ from 'lodash/fp'
import getDiff from './compareResults'
import importantHosts from './importantHosts'

const columnCount = 4
const wishesFilePath = path.join(__dirname, 'wishes.csv')

const resultsRoutes = express.Router({
  mergeParams: true
})

resultsRoutes.post('/', (request, response) => {

  const { title, imageSrcs, url, number } = request.body

  let src1 = ''
  let src2 = ''
  let src3 = ''

  if (imageSrcs.length) {

    src1 = imageSrcs[0]

  }
  if (imageSrcs.length > 1) {

    src2 = imageSrcs[1]

  }

  if (imageSrcs.length > 2) {

    src3 = imageSrcs[2]

  }

  const parsedUrl = Url.parse(url)

  let entry = [
    title,
    url,
    src1,
    `${parsedUrl.protocol}://${parsedUrl.host}`,
    src2,
    src3
  ]

  entry = _.map(_.flow(
    cleanWish,
    _.replace(/,/g, '&#44;')
  ), entry)

  entry = [number, ...entry].join(', ')

  fs.appendFile(wishesFilePath, `${entry}\n`)
  response.json({})

})

resultsRoutes.get('/diffs/', (request, response) => {

  getDiff(diffs => {

    const importantHostDiffs = _.pick(importantHosts, diffs.hostsUrlData)

    response.json(importantHostDiffs)

  })

})

let currentWishes = null
const urlColumn = 1

resultsRoutes.get('/:index', (request, response) => {

  const index = request.params.index

  if (!currentWishes) {
    fs.writeFile(wishesFilePath, '')
    WishParser('currentWishes.csv', columnCount).go(wishes => {

      currentWishes = wishes
      response.json({
        url: currentWishes[index][urlColumn]
      })

    })

  } else if (index >= currentWishes.length) {

    response.json({
      url: null
    })

  } else {

    response.json({
      url: currentWishes[index][urlColumn]
    })

  }


})

export default resultsRoutes
