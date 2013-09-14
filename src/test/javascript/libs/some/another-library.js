module.exports = function() {
    return new Library()
    .then("all is great", function() {
    	casper.test.assert(true, "Awesome!");
    });
}();