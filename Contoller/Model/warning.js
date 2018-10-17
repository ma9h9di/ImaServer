var warning = require('../Other/Warning');
var logd = require('../Other/Funcion').logd;

var pv = require('../Other/PublicValue');

class Warning {

    jsonWarning() {
        return {
            warning: [this.mWarn],
            type: pv.apiType.warning
        }
    }

    findThisWarning(code) {
        logd(code);
        for (let i = 0; i < warning.warn.length; i++) {
            if (warning.warn[i].code === code)
                return warning.warn[i];
        }
    }

    constructor(code, message, error_data) {
        this.mWarn = this.findThisWarning(code);
        // console.log('find %j',this.mWarn);
        if (message !== undefined)
            this.mWarn.message = message;
        if (error_data !== undefined)
            this.mWarn.error_data = error_data;
    }


}

module.exports = Warning;