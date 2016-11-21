import fs from 'fs'
import path from 'path'
import readline from 'readline'
import _ from 'lodash/fp'
import Entities from 'html-entities'

export const cleanWish = _.flow(
  _.trim,
  _.replace(/\s\s+/g, ' '),
  Entities.AllHtmlEntities.decode
)

const validateParsedLine = (line, columnCount) => parsedLine => {

  if (parsedLine.length > columnCount) {

    throw new Error(`Line "${line}" has too many columns`)

  }

  return parsedLine

}

/* const trace = (tag, func) => input => {
  const output = func(input)
  console.log(tag, output)  // eslint-disable-line no-console
  return output
}*/

const parseLine = (line, columnCount) => _.flow(
  _.split(','),
  _.map(cleanWish),
  validateParsedLine(line, columnCount)
)(line)

export default (filename, columnCount) => {

  const dataFile = path.join(__dirname, filename)
  const wishes = []
  const wishReader = readline.createInterface({
    input: fs.createReadStream(dataFile)
  })

  return {
    go: (onEnd) => {

      wishReader.on('line', line => {

        const output = parseLine(line, columnCount)

        wishes.push(output)

      })

      wishReader.on('close', () => {
        onEnd(wishes)
      })

    }
  }

}
