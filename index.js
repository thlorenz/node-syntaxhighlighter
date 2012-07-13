var fs = require('fs')
  , path = require('path')
  , scriptsDir = path.join(__dirname, './lib/scripts')
  , brushMap = { }
  , similarMap = { }
  , similarLangs = {
        'js'     :  [ 'json' ]
      , 'python' :  ['coffee', 'groovy', 'hs', 'haskell' ]
    }
  ;

(function mapBrushes() {
  fs.readdirSync(scriptsDir).forEach(function (file) {
    if (!file.match(/shBrush\w+\.js/)) return;
    
    var brush = require(path.join(scriptsDir, file)).Brush;
    brush.aliases.forEach(function (alias) {
      brushMap[alias.toLowerCase()] = brush;
    });
  });  

  // Add some known aliases
  brushMap['cs'] = brushMap['c#'];

  // Add similar brushes to similar map
  Object.keys(similarLangs).forEach(function (lang) {
    similarLangs[lang].forEach(function (similar) {
      similarMap[similar] = brushMap[lang];
    });
  });
}) ();

function getBrush(alias, strict) {
  return brushMap[alias] || (!strict ? similarMap[alias] : undefined);
}

function highlight(code, brush) {

  brush.init({ toolbar: false });

  return brush.getHtml(code);
}

module.exports = {
    highlight :  highlight
  , getBrush  :  getBrush
};
