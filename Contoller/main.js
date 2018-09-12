var mainPermission = require('./Permission/MainPermissionCheck');
var logd = require('./Other/Funcion').logd;
var pv = require('./Other/PublicValue');
var err = require('./Model/error');
var TAG = "main";

module.exports = {


    listen: function (io) {
        var soketFunction = require('./Other/SoketIoFunction')(io);
        // var idc = 0;
        // io.path('/myownpath');

        io.of('/main').on('connection', function (client) {
            logd('clinet connect', client.id);
            client.on('disconnect', function () {
                logd('disconnect socket', client.id);
                client.disconnect(true);
            });
            client.on('run', function (msg, errs) {
                //todo decrypt msg

                var decrypt_msg = msg;
                try {
                    // decrypt_msg = JSON.parse(decrypt_msg);

                    var outputCallback = function (output) {

                        var method = decrypt_msg.method === undefined ? 'err' : decrypt_msg.method;
                        method = method + '_result';
                        var sendData = {'event': method, 'data': output};
                        logd('output', sendData);
                        switch (output.type) {
                            case pv.apiType.err:
                                soketFunction.ErrorEmit(client.id, sendData);
                                break;
                            case pv.apiType.authentication:
                                soketFunction.authenticationEmit(client.id, sendData);
                                break;
                            case pv.apiType.contact: // TODO fix this to contactEmit
                                soketFunction.authenticationEmit(client.id, sendData);
                                break;
                        }
                    }

                    mainPermission.check(decrypt_msg, client, outputCallback);
                } catch (e) {
                    console.log(e);
                    var sendData = {'event': 'err_result', 'data': new err(pv.errCode.internal_err).jsonErr()};
                    soketFunction.ErrorEmit(client.id, sendData);
                }


                if (errs !== undefined) {
                    //todo err handel
                }
            });
        });


    }

}
