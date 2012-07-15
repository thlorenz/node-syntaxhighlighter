/*jshint asi:true */

var should = require('should')
  , dirname = __dirname
  , nsh = require('../node-syntaxhighlighter')
  ;

describe('language resolution', function () {

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

describe('highlight', function () {

  var code = 'some code'
    , highlightedCode = '<somecode>'
    , returnedCode
    , language
    , usedOpts
    ;

  before(function () {
    function Brush() { }

    Brush.prototype.init = function (opts) {
      usedOpts = opts;
    }

    Brush.prototype.getHtml = function (c) {
      if (c === code) return highlightedCode; else return undefined;
    }

    language = { Brush: Brush };
  })

  beforeEach(function () {
    usedOpts = undefined;
  })

  describe('when I call highlight with a language, but no options', function () {
    beforeEach(function () {
      returnedCode = nsh.highlight(code, language);
    });

    it('initializes brush with no toolbar option', function () {
      usedOpts.toolbar.should.be.false;
    })     
    it('initializes brush without gutter option', function () {
      should.not.exist(usedOpts.gutter)
    })     
    it('initializes brush without tabsize option', function () {
      should.not.exist(usedOpts['tab-size'])
    })     

    it('returns highlighted code', function () {
      returnedCode.should.eql(highlightedCode);
    })
  })
  
  describe('when I call highlight with a language, and options { toolbar: true, tab-size: 2 } ', function () {
    beforeEach(function () {
      returnedCode = nsh.highlight(code, language, { toolbar: true, 'tab-size': 2 });
    });

    it('initializes brush with toolbar option', function () {
      usedOpts.toolbar.should.be.true;
    })     
    it('initializes brush without gutter option', function () {
      should.not.exist(usedOpts.gutter)
    })     
    it('initializes brush with tab-size 2 option', function () {
      usedOpts['tab-size'].should.eql(2);
    })     

    it('returns highlighted code', function () {
      returnedCode.should.eql(highlightedCode);
    })
  })
})

describe('getStyles', function () {
  var styles;

  before(function () {
    styles = nsh.getStyles();
  })

  it('gets a list of all available styles', function () {
    styles.should.not.be.empty;
  })  

  it('contains style named default', function () {
    styles.filter(function (style) {
      return style.name === 'default'
    }).should.not.be.empty;
  })
  it('all styles have absolute sourcePath', function () {
    styles.filter(function (style) {
      return ! style.sourcePath.match(/(\/.+)+\w+\.css/);
    }).should.be.empty;
  })
})
