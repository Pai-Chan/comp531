// Inclass Fetch Exercise
// ======================
//
// Navigate to https://webdev-dummy.herokuapp.com/sample
//
// This endpoint returns a list of articles.  Your assignment is to
// write a function countWords that uses fetch() to query the endpoint,
// and return a map from the article id to the number of words in the
// article's text.
//
// Also write two "helper" functions that call this initial function.
//
// If there are any exceptions then fetch() will throw an error.
// Provide a "safe" version of the countWords function that always
// returns a map, which will be empty in the case of errors.
//
// Finally, write a function that returns the article id with the
// most number of words.
//
// Below I have provided you a template, you just need to fill in
// the implementation.
//
// Navigate to mocha-inclass-fetch.html to see if your implementation
// provides the expected results.
//
// Note that during the validation of the tests the browser will be
// directed to download invalid URLs which will result in error messages
// in the console:
//     GET https://webdev-dummy.herokuapp.com/badURL 404 (Not Found)
// this is expected and is not an error with your code.
//
(function(exports) {

    'use strict'

    function countWords(url) {
        // IMPLEMENT ME
        return fetch(url)
            .then(res => res.json())
            .then(res => {
                var map = {}
                var articles = res.articles
                articles.forEach(a => {
                    map[a._id] = a.text.split(" ").length
                })
                return map
            })
    }

    function countWordsSafe(url) {
        // IMPLEMENT ME
        return countWords(url).catch(
                e => {return {}}
            )
    }

    function getLargest(url) {
        // IMPLEMENT ME
        return countWords(url)
            .then(res => {
                var maxKey = null
                var maxItemLength = 0

                Object.keys(res).forEach(function(key){
                    let itemLength = res[key]
                    if (itemLength > maxItemLength){
                        maxKey = key
                        maxItemLength = itemLength
                    }
                })
                return maxKey
            }).catch(
                e => console.log(e)
            )
    }

    exports.inclass = {
        author: "pc30",
        countWords, countWordsSafe, getLargest
    }

})(this);
