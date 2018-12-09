const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const should = require('should')
const { upperBound, lowerBound, attribute } = require('../src/validators')

function loadMockupHTML(file) {
  const data = fs.readFileSync(path.join(__dirname, file), 'utf8')
  const html = cheerio.load(data)

  return html
}

describe('validator', () => {
  it('less than or equal to upperBound', done => {
    const html = loadMockupHTML('./test.html')
    const rule = {
      scope: 'head',
      tag: 'title',
      upperBound: 1
    }

    const target = html(rule.scope).find(rule.tag)
    const result = upperBound(target, rule)

    result.length.should.equal(0)

    done()
  })

  it('greater than upperBound', done => {
    const html = loadMockupHTML('./test.html')
    const rule = {
      scope: 'html',
      tag: 'a',
      upperBound: 100
    }

    const target = html(rule.scope).find(rule.tag)
    const result = upperBound(target, rule)

    result.length.should.equal(1)
    result[0].should.equal('More than 100 <a> in this HTML (Actual: 856)')

    done()
  })

  it('greater than lowerBound', done => {
    const html = loadMockupHTML('./test.html')
    const rule = {
      scope: 'head',
      tag: 'title',
      lowerBound: 10
    }

    const target = html(rule.scope).find(rule.tag)
    const result = lowerBound(target, rule)

    result.length.should.equal(1)
    result[0].should.equal('Need at least 10 <title> in this HTML (Actual: 1)')

    done()
  })

  it('less than or equal to lowerBound', done => {
    const html = loadMockupHTML('./test.html')
    const rule = {
      scope: 'html',
      tag: 'a',
      lowerBound: 100
    }

    const target = html(rule.scope).find(rule.tag)
    const result = lowerBound(target, rule)

    result.length.should.equal(0)

    done()
  })

  it('check meta in head with (name="description")', done => {
    const html = loadMockupHTML('./test.html')
    const rule = {
      scope: 'head',
      tag: 'meta',
      attribute: [
        { name: 'name', value: 'description', type: 'one' },
      ]
    }

    const target = html(rule.scope).find(rule.tag)
    const result = attribute(target, rule, html)

    result.length.should.equal(0)

    done()
  })

  it('check meta in head without (name="keywords")', done => {
    const html = loadMockupHTML('./test.html')
    const rule = {
      scope: 'head',
      tag: 'meta',
      attribute: [
        { name: 'name', value: 'keywords', type: 'one' },
      ]
    }

    const target = html(rule.scope).find(rule.tag)
    const result = attribute(target, rule, html)

    result.length.should.equal(1)
    result[0].should.equal('This HTML does not contain <meta name="keywords">')

    done()
  })

  it('check all <a> in html have rel attribute")', done => {
    const html = loadMockupHTML('./test.html')
    const rule = {
      scope: 'html',
      tag: 'a',
      attribute: [
        { name: 'rel', value: null, type: 'every' },
      ]
    }

    const target = html(rule.scope).find(rule.tag)
    const result = attribute(target, rule, html)

    result.length.should.equal(1)
    result[0].should.equal('There are 856 <a> tag without attribute: rel')

    done()
  })

  it('check all <link> in head have rel attribute")', done => {
    const html = loadMockupHTML('./test.html')
    const rule = {
      scope: 'head',
      tag: 'link',
      attribute: [
        { name: 'rel', value: null, type: 'every' },
      ]
    }

    const target = html(rule.scope).find(rule.tag)
    const result = attribute(target, rule, html)

    result.length.should.equal(0)

    done()
  })
})
