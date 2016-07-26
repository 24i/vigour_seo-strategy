'use strict'

var EventEmitter = require('events')
var oboe = require('oboe')

class Parser extends EventEmitter {
  /**
   * @id parser
   * @function Parser
   * Creates a parser for the data found at given `url`
   * @param url {string} - Where to GET the JSON data from (can also be a read stream, which is useful for testing)
   * @param options {object} - Extra options:
   * - appUrl: base app url, defaults to 'http://www.example.com'
   * @returns parser {object} - The created parser, which is also an event emitter allowing one to track the progress of the parsing process
   */
  constructor (url, options) {
    super()
    if (!options) {
      options = {}
    }
    if (!options.appUrl) {
      options.appUrl = 'http://www.example.com'
    }
    this.options = options
    this.url = url
  }

  /**
   * @id parse
   * @method parse
   * Starts the data parsing process
   */
  parse () {
    oboe(this.url)
      .node('!.*', (node, path, ancestors) => {
        var url = `${this.options.appUrl}/`
        this.emit('sitemap', { url })
        return oboe.drop
      })
      .on('fail', (err) => {
        this.emit('error', err)
      })
      .on('done', () => {
        this.emit('end')
      })
  }
}

module.exports = exports = Parser
