var fs           =  require('fs')
  , path         =  require('path')
  , scriptsDir   =  path.join(__dirname, './lib/scripts')
  , langMap      =  { }
  , similarMap   =  { }
  , similarLangs =  {
        'js'     :  [ 'json' ]
      , 'python' :  ['coffee', 'groovy', 'hs', 'haskell' ]
    }
  ;

(function mapBrushes() {
  fs.readdirSync(scriptsDir).forEach(function (file) {
    if (!file.match(/shBrush\w+\.js/)) return;
    
    var language = require(path.join(scriptsDir, file));
    language.Brush.aliases.forEach(function (alias) {
      langMap[alias.toLowerCase()] = language;
    });
  });  

  // Add some known aliases
  langMap['cs'] = langMap['c#'];

  // Add similar brushes to similar map
  Object.keys(similarLangs).forEach(function (lang) {
    similarLangs[lang].forEach(function (similar) {
      similarMap[similar] = langMap[lang];
    });
  });
}) ();

function getLanguage(alias, strict) {
  // accept *.ext, .ext and ext
  var normalizedAlias = alias.replace(/^\*/,'').replace(/^\./,'');

  return langMap[normalizedAlias] || (!strict ? similarMap[normalizedAlias] : undefined);
}

// options: http://alexgorbatchev.com/SyntaxHighlighter/manual/configuration/
function highlight(code, language, options) {
  var mergedOpts = { }
    , defaults = {
      toolbar: false
    };

  if (options) {
    // Gather all user specified options first
    Object.keys(options).forEach(function (key) {
      mergedOpts[key] = options[key];
    });
    // Add default option only if user didn't specify its value
    Object.keys(defaults).forEach(function (key) {
      mergedOpts[key] = options[key] || defaults[key];
    });

  } else {
    mergedOpts = defaults;
  }

  var brush = new language.Brush();

  brush.init(mergedOpts);

  return brush.getHtml(code);
}

module.exports = {
    highlight   :  highlight
  , getLanguage :  getLanguage
};
