(function() {
    var states = {};
    function type(elem) {
        if(elem == null) {
            return elem + "";
        }
        return toString.call(elem).replace(/[\[\]]/g, "").split(" ")[1].toLowerCase();
    }
    function get(name) {
        return states[name] ? states[name] : "";
    }
    function getStates() {
        return states;
    }
    function set(options, target) {
        var keys = Object.keys(options);
        var o = target ? target : states;
        keys.map(function(item) {
            if(typeof o[item] == "undefined") {
                o[item] = options[item];
            }
            else {
                type(o[item]) == "object" ? set(options[item], 0[item]) : o[item] = options[item];
            }
            return item;
        })
    }
})