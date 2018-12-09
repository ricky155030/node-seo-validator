const H1 = {
  scope: 'html',
  tag: 'h1',
  upperBound: 1,
  lowerBound: null,
  attribute: []
}

const STRONG = {
  scope: 'html',
  tag: 'strong',
  upperBound: 15,
  lowerBound: null,
  attribute: []
}

const HEADER_TITLE = {
  scope: 'head',
  tag: 'title',
  upperBound: null,
  lowerBound: 1,
  attribute: []
}

const HEADER_META = {
  scope: 'head',
  tag: 'meta',
  upperBound: null,
  lowerBound: null,
  attribute: [
    { name: 'name', value: 'description', type: 'one' },
    { name: 'name', value: 'keywords', type: 'one' }
  ]
}

const HTML_A = {
  scope: 'html',
  tag: 'a',
  upperBound: null,
  lowerBound: null,
  attribute: [
    { name: 'rel', value: null, type: 'every' }
  ]
}

const IMG_ALT = {
  scope: 'html',
  tag: 'img',
  upperBound: null,
  lowerBound: null,
  attribute: [
    { name: 'alt', value: null, type: 'every' }
  ]
}

module.exports = {
  HEADER_TITLE,
  HEADER_META,
  HTML_A,
  H1,
  IMG_ALT,
  STRONG
}
