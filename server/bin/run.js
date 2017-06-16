/**
 * Created by yuxuan on 8/11/16.
 */

require('babel-core/register')(
  {
    presets: ['stage-3', 'es2015-node5']
  }
)

require('babel-polyfill')
require('../app.js')
