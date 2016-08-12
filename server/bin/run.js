/**
 * Created by yuxuan on 8/11/16.
 */

require("babel-core/register")(
    {
        presets: ['stage-0', 'es2015']
    }
);

require("babel-polyfill");
require("../app.js");