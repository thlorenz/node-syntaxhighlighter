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
  return langMap[alias] || (!strict ? similarMap[alias] : undefined);
}

function highlight(code, language, options) {

  var brush = new language.Brush();
  brush.init({ toolbar: false });

  return brush.getHtml(code);
}
module.exports = {
    highlight   :  highlight
  , getLanguage :  getLanguage
};
