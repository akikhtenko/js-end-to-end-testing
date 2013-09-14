var fs = require('fs');
//casper.test.info('--->' + fs.workingDirectory);
var Yadda = require(fs.workingDirectory + '/src/test/lib/yadda/index.js');
var $ = require(fs.workingDirectory + '/src/test/lib/yadda/Array.js');

var TextParser = Yadda.parsers.TextParser;
var Dictionary = Yadda.Dictionary;
var Library = Yadda.localisation.English;

function readLibrary(relativePath) {
    return require(casper.cli.get("libs-dir") + relativePath);
}

function loadScenarios(file) {
    var parser = new TextParser();
    var text = fs.read(file);
    return parser.parse(text);
};

function runSpec(spec) {
    casper.test.info('');
    casper.test.info('====================================');
    casper.test.begin(spec.feature, function suite(test) {
      test.info('====================================');
      test.info('');
      $(spec.scenarios).eachAsync(function(scenario, completed, next) {
          casper.start();
          test.info('---> ' + scenario.title);
          casper.yadda(scenario.steps);
          casper.run(function() {
              test.info('');
              next();
          });
      }, function(err) {
          test.info('');
          test.done();
      });
    });
};

var libraries = require(casper.cli.get("lib"));
var yadda = new Yadda.Yadda($(libraries).flatten());
Yadda.plugins.casper(yadda, casper);

runSpec(loadScenarios(casper.cli.get("feature")));