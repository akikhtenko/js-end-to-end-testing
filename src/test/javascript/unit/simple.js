casper.test.begin('Casperjs.org is navigable', function suite(test) {
    casper.start('http://casperjs.org/', function() {
        test.assertTitleMatches(/casperjs/i);
        casper.clickLabel('testing');
    });

    casper.then(function() {
        test.assertUrlMatches(/tester\.html$/);
    });

    casper.run(function() {
        test.done();
    });
});