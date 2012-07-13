# node-syntaxhighlighter

Node friendly version of [Alex Gorbachev's great SyntaxHighlighter](http://alexgorbatchev.com/SyntaxHighlighter/).

# Why

The [current version of SyntaxHighlighter](https://github.com/alexgorbatchev/SyntaxHighlighter) does not work properly with nodejs.

Although it can be installed with npm by using the git repo url as package name, it doesn't work with nodejs right out of the box.

node-syntaxhighlighter tries to fix that and expose a node friendly api. 

# Example

```javascript
var nsh      =  require('../node-syntaxhighlighter')
  , language =  nsh.getLanguage('js')
  , code     =  'var nshRocks = true;'
  ;

console.log(
  nsh.highlight(code, language)
);
```

Outputs:

```html
<div id="highlighter_310085" class="syntaxhighlighter  ">
    <table border="0" cellpadding="0" cellspacing="0">
        <tbody>
            <tr>
                <td class="gutter">
                    <div class="line number1 index0 alt2">1</div>
                </td>
                <td class="code">
                    <div class="container">
                        <div class="line number1 index0 alt2">
                            <code class="keyword">var</code>
                            <code class="plain">nshRocks =</code>
                            <code class="keyword">true</code>
                            <code class="plain">;</code>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</div>
```

More examples inside [examples folder](./node-syntaxhighlighter/tree/master/examples).

# API

## *getLanguage(alias, strict = false)*

Resolves SyntaxHighlighter language for given alias and tries to use similar languages if strict is false.
Returns that language or undefined if not found.

## *highlight(code, language[, options])*

Highlights given code with SyntaxHighlighter language using given options.

For more information about options consult the [SyntaxHighlighter configuration page](http://alexgorbatchev.com/SyntaxHighlighter/manual/configuration/).

# Syncing with original SyntaxHighlighter

node-syntaxhighlighter includes a synchronization script which allows staying up to date with the original SyntaxHighlighter.

I will run this whenever a new version of SyntaxHighlighter becomes available and the publish the updated version.

The currently synced version is documented inside [package.json](./node-syntaxhighlighter/blob/master/package.json) as the "version-sync".


