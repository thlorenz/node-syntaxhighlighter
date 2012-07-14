/*jshint asi:true */

var should = require('should')
  , proxyquire = require('proxyquire').setup()
  , dirname = __dirname
  , nsh
  ;


describe('language resolution', function () {
  before(function () {
    nsh = proxyquire
      .reset()
      .require('../node-syntaxhighlighter');
  })

  describe('resolving unknown language', function () {
    it('returns undefined for "unknown lang"', function () {
      should.not.exist(nsh.getLanguage('unknown lang'))
    })   
  })

  describe('resolving known language', function () {
    it('returns language for "js"', function () {
      should.exist(nsh.getLanguage('js'))
    })  
  })

  describe('resolving known similar language non-strict', function () {
    it('returns language for "coffee"', function () {
      should.exist(nsh.getLanguage('coffee'))
    })  
  })

  describe('resolving known similar language strict', function () {
    it('returns undefined for "coffee"', function () {
      should.not.exist(nsh.getLanguage('coffee', true))
    })  
  })

  describe('resolving known language by file extension', function () {
    it('returns language for ".js"', function () {
      should.exist(nsh.getLanguage('.js'))
    })  
    it('returns language for "*.js"', function () {
      should.exist(nsh.getLanguage('*.js'))
    })  
  })
})

