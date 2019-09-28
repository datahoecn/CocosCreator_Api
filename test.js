var parse = function (locator) {
    let names = locator.split(/[.,//,>,#]/g);
    let segments = names.map(function (name) {
        let index = locator.indexOf(name);
        let symbol = locator[index - 1] || '>';
        return {symbol: symbol, name: name.trim()};
    });
    return segments;
}

var a = "a/b.c/a.a/a/a";
var b = a.split(/[.,/]/g);
let c = b.map(function (name) {
        let index = a.indexOf(name);
        let symbol = a[index - 1] || '>';
        return {symbol: symbol, name: name.trim()};
    });
console.log(b);
console.log(c);