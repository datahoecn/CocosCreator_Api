formatStr = function () {
    var argLen = arguments.length;
    if (argLen === 0) {
        return '';
    }
    var msg = arguments[0];
    if (argLen === 1) {
        return '' + msg;
    }

    var hasSubstitution = typeof msg === 'string' && REGEXP_NUM_OR_STR.test(msg);
    if (hasSubstitution) {
        for (let i = 1; i < argLen; ++i) {
            var arg = arguments[i];
            var regExpToTest = typeof arg === 'number' ? REGEXP_NUM_OR_STR : REGEXP_STR;
            if (regExpToTest.test(msg))
                msg = msg.replace(regExpToTest, arg);
            else
                msg += ' ' + arg;
        }
    }
    else {
        for (let i = 1; i < argLen; ++i) {
            msg += ' ' + arguments[i];
        }
    }
    return msg;
};

var a = formatStr("aa: %s", "aa")