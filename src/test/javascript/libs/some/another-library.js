module.exports = function() {
    return new Library()
    .then("all is great", function() {
    	$$assert(true, "Awesome!");
    });
}();