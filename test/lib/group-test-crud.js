const test = require('tape')
const testPost = require('./test-post.js')
const testGet = require('./test-get.js')
const { merge } = require('ramda')
/*
 ('BOOKS CRUD TEST', '/books', {book object}, 'book_bugs_life')
*/

// testGet(t, /books/book_bugs_life)

module.exports = (testName, path, postRequestBody, pk) => {
  return new Promise((resolve, reject) => {
    test(testName, t => {
      testPost(t, path, postRequestBody, pk)
        .then(body =>
          testGet(t, `${path}/${pk}`, merge(postRequestBody, { _id: pk }))
        )
        .then(body => resolve(body))
        .then(() => t.end())
        .catch(err => {
          reject(err)
        })
    })
  })
}