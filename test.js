var jscript = require('./lib/scripts/shBrushJScript');

var code = 'var a = 3;';

var brush = new jscript.Brush();

brush.init({ toolbar: false });

console.log(brush.getHtml(code));
