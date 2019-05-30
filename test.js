function addon(obj){
    'use strict';
    obj = obj || {};
    console.log(arguments)
    for (var i = 1, length = arguments.length; i < length; i++) {
        var source = arguments[i];
        if (source) {
            if (typeof source !== 'object') {
               
                continue;
            }
            for ( var name in source) {
                if ( !(name in obj) ) {
                    _copyprop( name, source, obj);
                }
            }
        }
    }
    return obj;
}
console.log(addon(1,2,3))