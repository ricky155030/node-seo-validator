const cheerio = require('cheerio')
const Table = require('cli-table')
const fs = require('fs')

const rules = require('./rules')
const { validator } = require('./validators')

function output(validateResult, destination) {
  const table = new Table({
    head: ['Rule Name', 'Validate Result']
  })

  validateResult.forEach(r => table.push(r))

  const defaultOutput = './seo.log'
  const output = destination || defaultOutput

  fs.writeFileSync(`${output}`, table.toString())
  console.log(`Output file: ${output}`)
  console.log(table.toString())
}

function seo(source, destination, seoRules) {
  const rawData = fs.readFileSync(source, 'utf8')
  const html = cheerio.load(rawData)

  const result = seoRules.reduce((prev, ruleName) => {
    const validateResult = validator(html, rules[ruleName])

    if(validateResult.length == 0) {
      prev.push([ruleName, 'Good'])
    } else {
      validateResult.forEach(r => {
        prev.push([ruleName, r])
      })
    }

    return prev
  }, [])

  output(result, destination)
}

module.exports = seo
