function upperBound(target, rule) {
  const result = []

  if(rule.upperBound !== null && target.length > rule.upperBound) {
    result.push(`More than ${rule.upperBound} <${rule.tag}> in this HTML (Actual: ${target.length})`)
  }

  return result
}

function lowerBound(target, rule) {
  const result = []

  if(rule.lowerBound !== null && target.length < rule.lowerBound) {
    result.push(`Need at least ${rule.lowerBound} <${rule.tag}> in this HTML (Actual: ${target.length})`)
  }

  return result
}

function attribute(target, rule, html) {
  const count = []
  const result = []

  target.each((i, e) => {
    if(rule.attribute.length > 0) {
      const attributes = html(e).attr()

      rule.attribute.forEach((v, index) => {
        const isMatch = attributes[v.name] !== undefined
          && (v.value === null || v.value === attributes[v.name])

        if(count[index] === undefined) {
          count[index] = 0
        }

        if(v.type === 'one' && isMatch) {
          count[index]++
        }

        if(v.type === 'every' && !isMatch) {
          count[index]++
        }
      })
    }
  })

  rule.attribute.forEach((v, index) => {
    if(v.type === 'one' && !count[index]) {
      result.push(`This HTML does not contain <${rule.tag} ${v.name}="${v.value}">`)
    }

    if(v.type === 'every' && count[index] > 0) {
      result.push(`There are ${count[index]} <${rule.tag}> tag without attribute: ${v.name}`)
    }
  })

  return result
}

function validator(html, rule) {
  const {
    tag,
    scope
  } = rule

  let result = []
  const target = html(scope).find(tag)

  result = result.concat(upperBound(target, rule))
  result = result.concat(lowerBound(target, rule))
  result = result.concat(attribute(target, rule, html))

  return result
}

module.exports = {
  validator,
  attribute,
  upperBound,
  lowerBound
}
