import _ from 'lodash/fp'
import { parseJSON } from './utils/fetch'


const renderUrlDiff = diff =>
   `
    <div class="urlDataWrapper">
      <a href="${diff.url}" target="_blank">${diff.url}</a>
      <div class="urlData">
         <img src="${diff.imageSrc.newImageSrc}"/>
      </div>
      <div class="urlData">
         <img src="${diff.imageSrc.imageSrc}"/>
      </div>
    </div>
  `


const renderDiffs = diffs => {

  const hosts = _.keys(diffs)
  const hostsHtml = _.map(host => {

    const hostTitle = `<h2>${host}</h2>`
    let hostDiffs = diffs[host].diffs
    hostDiffs = _.filter('imageSrc', hostDiffs)
    const hostDiffsSample = _.sampleSize(10, hostDiffs)
    let urlHtml = _.map(renderUrlDiff, hostDiffsSample)
    urlHtml = urlHtml.join('')

    return `<div class="host">${hostTitle}<div class="urlDiffs">${urlHtml}</div></div>`

  }, hosts)


  document.getElementById('root').innerHTML = hostsHtml.join('')

}

fetch('/api/results/diffs/')
  .then(parseJSON)
  .then(renderDiffs)

