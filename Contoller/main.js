var mainPremission = require('./Premission/MainPremissionCheck');
var logd=require('./Other/Funcion').logd;
var pv=require('./Other/PublicValue');

var TAG="main";
module.exports = {

    
    listen: function (io) {
        var soketFunction=require('./Other/SoketIoFunction')(io);
        // var idc = 0;
        // io.path('/myownpath');
        io.of('/main').on('connection', function (client) {
            logd('clinet connect',client.id)
            client.on('disconnect', function () {
                logd('disconnect socket',client.id );
                client.disconnect(true);
            });
            client.on('run', function (msg, err) {
                //todo decrypt msg
                var decrypt_msg=msg;
                decrypt_msg=JSON.parse(decrypt_msg);
                var output=mainPremission.check(decrypt_msg,client);
                logd('output',output);
                var method=decrypt_msg.method===undefined?'err':decrypt_msg.method;
                method=method+'_result';
                var sendData={'event':method,'data':output};
                switch (output.type) {
                    case pv.apiType.err:
                        soketFunction.ErrorEmit(client.id,sendData);
                        break;
                    case pv.apiType.authentication:
                        soketFunction.authenticationEmit(client.id,sendData);
                        break;
                }


                client.emit(decrypt_msg.method + '_result','ddd')

                if (err != undefined){
                    //todo err handel

                }
            });
        });


    }

}
