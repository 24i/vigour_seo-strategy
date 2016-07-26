'use strict'

var path = require('path')
var fs = require('fs')
var test = require('tape')

var dataPath = path.join(__dirname, 'data.json')

test('strategy', function (t) {
  var rs = fs.createReadStream(dataPath)
  var Parser = require('../')
  var parser = new Parser(rs)
  parser.on('error', function (err) {
    console.error('Parser error', err)
    t.fail('Parser error')
  })
  parser.on('sitemap', function (item) {
    t.comment('sitemap')
    t.ok(item.url, 'url is provided')
  })
  parser.on('end', function () {
    t.end()
  })
  parser.parse()
})
