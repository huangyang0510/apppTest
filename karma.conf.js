
module.exports = function(config){
    'use strict';
    config.set({
        basePath    : '',
        frameworks  : ['mocha' , 'chai' , 'sinon'],
        browsers    : ['PhantomJS'],
        reporters   : ['progress' , 'coverage'],
        coverageReporter  : {
            type  : 'lcov',
            dir   : _dirname + '/coverage/'
        },
        plugins     : [
            'karma-coverage',
            'karma-mocha',
            'karma-chai',
            'karma-sinon',
            'karma-phantomjs-launcher'
        ],
        preprocessors:{
            '**/bundled/test/bdd.test.js' : 'coverage'
        },
        files        : [
          {
            pattern  : __dirname + "/bundled/test/bdd.test.js",
            included : true
          } , {
            pattern  : __dirname + "/node_modules/jquery/dist/jquery.min.js",
            included : true
          } , {
            pattern  : __dirname + "/node_modules/bootstrap/dist/bootstrap.min.js",
            included : true
          }
        ],
        client      : {
            mocha : {
              ui : "bdd"
            }
        },
        port        : 9876,
        colors      : true,
        autoWatch   : false,
        logLevel    : config.DEBUG
    });
}
