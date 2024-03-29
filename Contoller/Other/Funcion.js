var livelog = false;

function isset(obj) {
    return 'undefined' != typeof(obj);
}

var log = function (name, str) {
    if (!isset(str)) {
        str = name;
        name = undefined;
    }
    if (livelog !== false && isset(LE)) {
        var uid = device.code;
        var obj = {'uid': uid, 'prefix': livelog};
        if (name) {
            obj.name = name;
            obj.val = str;
        } else {
            obj.log = str;
        }
        LE['log'](obj);
    }
    if (typeof str === typeof {})
        str = JSON.stringify(str);
    if (name)
        console.log(name + " : " + str);
    else
        console.log(str);

};
var logd = function (name, str) {

    var a = (new Error()).stack.match(/[a-zA-Z\.]+\:[0-9]+\:/g);
    a = a[1];
    a = a.split(':');
    var file = a[0];
    var line = a[1];

    log("--> " + file + ":" + line + "\t" + name, str);
};
logd("create Function", " hello");
exports.logd = logd;