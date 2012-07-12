
function highlight(code, language) {

  var langScript = require('./lib/scripts/shBrush' + language)
    , brush = new langScript.Brush();

  brush.init({ toolbar: false });

  return brush.getHtml(code);
}

module.exports = {
    highlight: highlight
};
