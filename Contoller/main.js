const mainPermission = require('./Permission/MainPermissionCheck');
const logd = require('./Other/Funcion').logd;
const logServer = require('./Other/Funcion').logServer;
const telegram =require('./Other/TelegramBot');
const pv = require('./Other/PublicValue');
const err = require('./Model/error');
const TAG = "main";

function sendingMessage(output, decrypt_msg, client, soketFunction) {

    let method = decrypt_msg.method === undefined ? 'err' : decrypt_msg.method;
    method = method + '_result';
    const sendData = {'event': method, 'data': output};
    let pushToUser = false;
    if (output.hasOwnProperty('pushToUser')) {
        pushToUser = output.pushToUser;
        delete output.pushToUser;
    }
    //err detect
    if (output.hasOwnProperty('error')) {
        for (let i = 0; i < output.error.length; i++) {
            if (output.error[i].hasOwnProperty('sendToDeveloper') && output.error[i].sendToDeveloper){
                telegram.sendUserErr(decrypt_msg,output.error[i].code);
                delete output.error[i].sendToDeveloper;
            }
        }

    }
    //save log
    logServer({input:decrypt_msg,output:sendData});
    switch (output.type) {
        case pv.apiType.err:
            soketFunction.ErrorEmit(client.id, sendData);
            break;
        case pv.apiType.authentication:
            soketFunction.authenticationEmit(client.id, sendData);
            break;
        case pv.apiType.contact:
            soketFunction.contactEmit(client.id, sendData);
            break;
        case pv.apiType.chat:
            soketFunction.chatEmit(client.id, sendData);
            break;
        case pv.apiType.message:
            soketFunction.messageEmit(client.id, sendData);
            break;
        case pv.apiType.user:
            soketFunction.userEmit(client.id, sendData);
            break;
    }
    if (pushToUser) {
        for (let i = 0; i < pushToUser.length; i++) {
            let element = pushToUser[i];
            try {
                //save log
                logServer({input:decrypt_msg,push:element});

                soketFunction.pushToUserEmit(element.clientID, element.data);
            } catch (e) {
                logd('in push to userErr', e)
            }
        }
    }
}

module.exports = {


    listen: function (io) {
        const soketFunction = require('./Other/SoketIoFunction')(io);
        // const idc = 0;
        // io.path('/myownpath');

        io.of('/main').on('connection', function (client) {
            logd('clinet connect', client.id);
            client.on('disconnect', function () {
                logd('disconnect socket', client.id);
                client.disconnect(true);
            });
            client.on('run', async function (msg, errs) {
                //todo decrypt msg
                const decrypt_msg = msg;
                decrypt_msg.inputTime=new Date().getTime();
                try {
                    try {
                        const mainCheck = await mainPermission.check(decrypt_msg, client);
                        sendingMessage(mainCheck, decrypt_msg, client, soketFunction);
                    } catch (e) {
                        sendingMessage(e, decrypt_msg, client, soketFunction);
                    }
                } catch (e) {
                    console.log(e);
                    const sendData = {'event': 'err_result', 'data': new err(pv.errCode.internal_err).jsonErr()};
                    soketFunction.ErrorEmit(client.id, sendData);
                }
                if (errs !== undefined) {
                    //todo err handel
                }
            });
        });
    }

};
