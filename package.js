/* global Package */

Package.describe({
  name: 'liberation:simpleschema-helpers',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/dolgarev/meteor-simpleschema-helpers',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
})

Package.onUse(function (api) {
  api.versionsFrom('1.6')
  api.use(['ecmascript', 'tracker'])
  api.mainModule('simpleschema-helpers.js')
})

Package.onTest(function (api) {
  api.use(['ecmascript', 'tinytest', 'simpleschema-helpers'])
  api.mainModule('simpleschema-helpers-tests.js')
})
