import _ from 'lodash/fp'
import importantHosts from './importantHosts'


const getPercent = (numerator, denominator) =>
   `${String(
    Math.round(
      (numerator / denominator) * 100
    )
  )}%`


const getUrlCountForHosts = hostsUrlData => _.reduce((next, host) =>
   next + hostsUrlData[host].count
)(0)

const getCorrectImagesForHosts = hostsUrlData => _.reduce((next, host) =>
   next + hostsUrlData[host].correctImages
)(0)

const getCorrectTitlesForHosts = hostsUrlData => _.reduce((next, host) =>
   next + hostsUrlData[host].correctTitles
)(0)

const getCategoryReport = (hosts, totalUrlCount, totalHostCount, hostsUrlData) => {

  const urlCount = getUrlCountForHosts(hostsUrlData)(hosts)
  const correctTitles = getCorrectTitlesForHosts(hostsUrlData)(hosts)
  const correctImages = getCorrectImagesForHosts(hostsUrlData)(hosts)

  return {
    count: hosts.length,
    percentageHosts: getPercent(hosts.length, totalHostCount),
    urlCount,
    percentageUrls: getPercent(urlCount, totalUrlCount),
    percentageCorrectImages: getPercent(correctImages, urlCount),
    percentageCorrectTitles: getPercent(correctTitles, urlCount)
    //hostsUrlData: _.pick(hosts, hostsUrlData)
  }

}

export default diffStats => {

  const totalUrlCount = getUrlCountForHosts(diffStats.hostsUrlData)(diffStats.hosts)
  const totalCorrectImages = getCorrectImagesForHosts(diffStats.hostsUrlData)(diffStats.hosts)
  const totalCorrectTitles = getCorrectTitlesForHosts(diffStats.hostsUrlData)(diffStats.hosts)
  const percentageCorrectImages = getPercent(totalCorrectImages, totalUrlCount)
  const percentageCorrectTitles = getPercent(totalCorrectTitles, totalUrlCount)

  const diffReport = {
    totalHosts: diffStats.hosts.length,
    totalUrlCount,
    totalCorrectTitles,
    totalCorrectImages,
    percentageCorrectImages,
    percentageCorrectTitles,
    alwaysExactMatch: getCategoryReport(
      diffStats.alwaysExactMatchHosts,
      totalUrlCount,
      diffStats.hosts.length,
      diffStats.hostsUrlData
    ),
    alwaysImageMatch: getCategoryReport(
      diffStats.alwaysImageMatchHosts,
      totalUrlCount,
      diffStats.hosts.length,
      diffStats.hostsUrlData
    ),
    alwaysTitleMatch: getCategoryReport(
      diffStats.alwaysTitleMatchHosts,
      totalUrlCount,
      diffStats.hosts.length,
      diffStats.hostsUrlData
    ),
    sometimesImageMatch: getCategoryReport(
      diffStats.sometimesImageMatchHosts,
      totalUrlCount,
      diffStats.hosts.length,
      diffStats.hostsUrlData
    ),
    sometimesTitleMatch: getCategoryReport(
      diffStats.sometimesTitleMatchHosts,
      totalUrlCount,
      diffStats.hosts.length,
      diffStats.hostsUrlData
    ),
    maybeMatch: getCategoryReport(
      diffStats.maybeMatchHosts,
      totalUrlCount,
      diffStats.hosts.length,
      diffStats.hostsUrlData
    )
  }

  console.log(JSON.stringify(diffReport, null, 4))

}
