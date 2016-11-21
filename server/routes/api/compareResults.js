import _ from 'lodash/fp'
import WishParser from './WishParser'
import reportStats from './report'

const map = _.map.convert({
  cap: false
})

const verifiedGoodHosts = [
  'https://www.etsy.com',
  'http://www.urbanoutfitters.com',
  'http://shop.nordstrom.com',
  'http://www.forever21.com',
  'http://www1.macys.com',
  'https://www.victoriassecret.com',
  'http://www.bathandbodyworks.com',
  'http://www.worldmarket.com'
]

const verifiedBadHosts = [
  'http://www.target.com',
  'http://www.sephora.com',
  'http://m.sephora.com',
  'https://colourpop.com',

  'http://www.ulta.com', // could find right images if parsing
  'https://www.chapters.indigo.ca'

]

const cleanCurrentWishes = currentWishes => {

  const cleaned = [...currentWishes]

  for (let i = 0; i < cleaned.length; i++) {

    if (cleaned[i].length === 3) {

      cleaned[i].splice(2, 0, 'No Image')

    }

    if (cleaned[i][0] === cleaned[i][1]) {

      cleaned[i][0] = 'No Title'

    }

  }

  return cleaned

}

const cleanNewWishes = (newWishes, currentWishes) => {

  const cleaned = [...newWishes]

  for (let i = 0; i < cleaned.length; i++) {

    if (Number(cleaned[i][0]) !== i) {

      cleaned.splice(i, 0, [i, 'Error', currentWishes[i][1], 'Error', currentWishes[i][3], 'Error', 'Error'])

    }

    const host = cleaned[i][4]

    cleaned[i][4] = host.replace('https::', 'https:').replace('http::', 'http:')

  }

  return cleaned

}

const areTitlesSimilar = (newTitle, currentTitle) => {

  if (newTitle === currentTitle) {

    return true

  }

  const newTitleWords = newTitle.toLowerCase().split(' ')
  const currentTitleWords = currentTitle.toLowerCase().split(' ')
  const overlapRatio = _.intersection(currentTitleWords, newTitleWords).length / currentTitleWords.length

  return overlapRatio >= 0.5

}

const diffWishes = currentWishes => map((wish, index) => {

  const [
    wishIndex,
    newTitle,
    newUrl,
    newImageSrc,
    newHost,
    newImageSrc2,
    newImageSrc3
  ] = wish
  const [title, url, imageSrc, host] = currentWishes[index]
  const diff = {
    isMatch: true,
    url,
    host: newHost
  }

  if (_.includes(host, verifiedGoodHosts)) {

    return diff

  }

  if (!areTitlesSimilar(newTitle, title) &&
    !(title === 'No Image' && !newTitle)
    ) {

    diff.title = {
      newTitle,
      title
    }
    diff.isMatch = false

  }

  if (
    imageSrc !== newImageSrc &&
    !(imageSrc === 'No Image' && !newImageSrc)
  ) {

    diff.imageSrc = {
      newImageSrc,
      imageSrc
    }

    diff.isMatch = false

  }

  return diff

})

const getDiffStats = _.reduce((stats, diff) => {

  stats.hosts.push(diff.host)

  if (!stats.hostsUrlData[diff.host]) {

    stats.hostsUrlData[diff.host] = {
      count: 0,
      correctImages: 0,
      correctTitles: 0,
      titleDiffs: [],
      imageDiffs: [],
      diffs: []
    }

  }

  stats.hostsUrlData[diff.host].count += 1

  if (!diff.imageSrc) {

    stats.imageMatchHosts.push(diff.host)
    stats.hostsUrlData[diff.host].correctImages += 1

  } else {

    stats.imageDidntMatchHosts.push(diff.host)
    stats.hostsUrlData[diff.host].imageDiffs.push(diff.imageSrc)

  }

  if (!diff.title) {

    stats.titleMatchHosts.push(diff.host)
    stats.hostsUrlData[diff.host].correctTitles += 1

  } else {

    stats.titleDidntMatchHosts.push(diff.host)
    stats.hostsUrlData[diff.host].titleDiffs.push(diff.title)

  }

  if(diff.title || diff.imageSrc) {
    stats.hostsUrlData[diff.host].diffs.push(diff)
  }

  return stats

}, {
  hosts: [],
  hostsUrlData: {},
  imageMatchHosts: [],
  titleMatchHosts: [],
  imageDidntMatchHosts: [],
  titleDidntMatchHosts: []
})


const compareResults = (newWishes, currentWishes) => {

  let cleanedCurrent = cleanCurrentWishes(currentWishes)
  let cleanedNew = cleanNewWishes(newWishes, cleanedCurrent)
  cleanedCurrent = _.remove(wish => _.includes(wish[3], verifiedBadHosts), cleanedCurrent)
  cleanedNew = _.remove(wish => _.includes(wish[4], verifiedBadHosts), cleanedNew)
  const wishDiffs = diffWishes(cleanedCurrent)(cleanedNew)
  const diffStats = getDiffStats(wishDiffs)


  diffStats.hosts = _.uniq(diffStats.hosts)

  diffStats.imageMatchHosts = _.uniq(diffStats.imageMatchHosts)
  diffStats.titleMatchHosts = _.uniq(diffStats.titleMatchHosts)
  diffStats.imageDidntMatchHosts = _.uniq(diffStats.imageDidntMatchHosts)
  diffStats.titleDidntMatchHosts = _.uniq(diffStats.titleDidntMatchHosts)

  diffStats.alwaysExactMatchHosts = _.flow(
    _.filter(host => !_.contains(host, diffStats.imageDidntMatchHosts)),
    _.filter(host => !_.contains(host, diffStats.titleDidntMatchHosts))
  )(diffStats.hosts)

  diffStats.alwaysImageMatchHosts = _.flow(
    _.filter(host => !_.contains(host, diffStats.imageDidntMatchHosts))
  )(diffStats.hosts)

  diffStats.alwaysTitleMatchHosts = _.flow(
    _.filter(host => !_.contains(host, diffStats.titleDidntMatchHosts))
  )(diffStats.hosts)

  diffStats.sometimesImageMatchHosts = _.intersection(
    diffStats.imageDidntMatchHosts,
    diffStats.imageMatchHosts
  )

  diffStats.sometimesTitleMatchHosts = _.intersection(
    diffStats.titleDidntMatchHosts,
    diffStats.titleMatchHosts
  )

  diffStats.maybeMatchHosts = _.uniq(
    _.concat(
      diffStats.titleDidntMatchHosts,
      diffStats.imageDidntMatchHosts
    )
  )

  console.log(diffStats)
  return diffStats

}

export default onDiffComplete => {
  let currentWishes = []
  let newWishes = []
  const newWishParser = WishParser('wishes.csv', 7)
  const currentWishParser = WishParser('currentWishes.csv', 4)

  console.log('nw')
  newWishParser.go(wishes => {

    newWishes = wishes
    console.log('cw checklen')
    if (currentWishes.length) {
      console.log('cw hasLen')
      onDiffComplete(compareResults(wishes, currentWishes))

    }

  })

  console.log('cw')
  currentWishParser.go(wishes => {

    currentWishes = wishes
    console.log('nw checklen')
    if (newWishes.length) {
      console.log('nw hasLen')
      onDiffComplete(compareResults(newWishes, wishes))

    }

  })
}
