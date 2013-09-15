module.exports = function() {

    var dictionary = new Dictionary()
        .define('LOCALE', /(fr|es|en)/)
        .define('NUM', /(\d+)/);

    var library = new Library(dictionary)

    .when("I open Google's $LOCALE search page", function(locale) {    
    	$$open("http://www.google." + locale + "/", {headers: {'User-Agent': 'Chrome'}});
    })

    .then("the title is $TITLE", function(title) {
    	$$assert(true, "true's true");
    })

    .then("the $ACTION form exists", function(action) {
    	$$assertExists('form[action="/' + action + '"]', 'form is found');
    })

    .when("I search for $TERM", function(term) {
    	$$fill('form[action="/search"]', { q: term }, true);
    })

    .then("the search for $TERM was made", function(term) {
    	var regex = new RegExp('q=' + term)
    	$$assertUrlMatch(regex, 'search term has been submitted');
    })

    .then("$NUM or more results were returned", function(number) {
        $$assertEval(function(number) {
            return __utils__.findAll('h3.r').length >= number;
        }, 'google search retrieves ' + number + ' or more results', [number]);		
    });

    return [library, readLibrary('/some/another-library.js')];
}();