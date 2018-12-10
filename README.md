# node-seo-validator

SEO validator for static html file.

## Installation

```bash
yarn add node-seo-validator
# or
npm install --save node-seo-validator
```

## Test

```bash
yarn test
# or
npm test
```

## Usage

### seo(htmlFilePath, outputLogPath, applyRules)
**Parameters**
* `htmlFilePath`: Static html file input
* `outputLogPath`: Log path for output validation result
* `applyRules`: SEO rule names in array, these rule name should be configured in `src/rules.js`

Currently, there are 6 [Pre-defined SEO Rules](#pre-defined-seo-rules) in this package.

`IMG_ALT`, `HTML_A`, `HEADER_TITLE`, `HEADER_META`, `STRONG`, `H1`
```javascript
// test.js
const seo = require('node-seo-validator')

const applyRules = [
  'IMG_ALT',
  'HTML_A',
  'HEADER_TITLE',
  'HEADER_META',
  'STRONG',
  'H1'
]

seo('./index.html', './seo.log', applyRules)
```

**Output**
```bash
$ node test.js
Output file: ./seo.log
┌──────────────┬───────────────────────────────────────────────────┐
│ Rule Name    │ Validate Result                                   │
├──────────────┼───────────────────────────────────────────────────┤
│ IMG_ALT      │ There are 27 <img> tag without attribute: alt     │
├──────────────┼───────────────────────────────────────────────────┤
│ HTML_A       │ There are 856 <a> tag without attribute: rel      │
├──────────────┼───────────────────────────────────────────────────┤
│ HEADER_TITLE │ Good                                              │
├──────────────┼───────────────────────────────────────────────────┤
│ HEADER_META  │ This HTML does not contain <meta name="keywords"> │
├──────────────┼───────────────────────────────────────────────────┤
│ STRONG       │ Good                                              │
├──────────────┼───────────────────────────────────────────────────┤
│ H1           │ Good                                              │
└──────────────┴───────────────────────────────────────────────────┘
```

## Rule Configuration
You can define your SEO rules in `src/rules.js`

```javascript
/* 
   New rule to validate if
     <meta name="robots" />
   has been defined in <head>
*/
const HEADER_META_ROBOTS = {
  scope: 'head',
  tag: 'meta',
  upperBound: null,
  lowerBound: null,
  attribute: [
    { name: 'name', value: 'robots', type: 'one' }
  ]
}
```

| Key | Description | Sample Value |
|---|---|---|
| **scope** | Validate elements which are under this scope | `head` |
| **tag** | Which element you want to validate | `meta` |
| **upperBound** | Set upper bound limit to this **tag**<br> Set `null` to ignore this rule | `10` |
| **lowerBound** | Set lower bound limit to this **tag**<br> Set `null` to ignore this rule | `10` |
| **attribute** | Array of attribute rule object<br> Set `[]` to ignore this rule | ```[{ name: 'name', value: 'description', type: 'one' }]```

**Attribute Rule Object**

| Key | Description | Sample Value |
|---|---|---|
| **name** | Defined the attribute name to validate | `href` |
| **value** | Defined the value of this attribute to validate<br> Set `null` to ignore this rule | `https://github.com/` |
| **type** | Define this name/value rule should appear in at least one element or every elements | `one` or `every` |


## Pre-defined SEO Rules
There are some pre-defined rule in this package.
### 1. IMG_ALT
Detect if any `<img />` tag without alt attribute.

### 2. HTML_A
Detect if any `<a />` tag without rel attribute.

### 3. HEADER_TITLE
In `<head>` tag, Detect if header doesn’t have `<title>` tag.

### 4. HEADER_META
In `<head>` tag, Detect if header doesn’t have `<meta name="descriptions" ... />` and `<meta name="keywords" ... />` tag.

### 5. STRONG
Detect if there are more than 15 `<strong>` tag in HTML.

### 6. H1
Detect if a HTML have more than one `<H1>` tag.
