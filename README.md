# node-syntaxhighlighter

Node friendly version of [Alex Gorbachev's great SyntaxHighlighter](http://alexgorbatchev.com/SyntaxHighlighter/).

# Why

The [current version of SyntaxHighlighter](https://github.com/alexgorbatchev/SyntaxHighlighter) does not work properly with nodejs.

Although it can be installed with npm by using the git repo url as package name, it doesn't work with nodejs right out of the box.

node-syntaxhighlighter tries to fix that and expose a node friendly api. It includes a synchronization script which allows staying up to date with the original SyntaxHighlighter.


# API

## *getLanguage(alias, strict = false)*

Resolves SyntaxHighlighter language for given alias and tries to use similar languages if strict is false.
Returns that language or undefined if not found.

## *highlight(code, language[, options])*

Highlights given code with SyntaxHighlighter language using given options.

For more information about options consult the [SyntaxHighlighter configuration page](http://alexgorbatchev.com/SyntaxHighlighter/manual/configuration/).

