const logd = require('./Funcion').logd;
module.exports = function (io) {
    function oneSessionEmit(socketId, sendData, channel = 'main') {
        const date = new Date();
        sendData.data.time = date.getTime();
        io.of('/' + channel).connected[socketId].emit(sendData.event, sendData.data);
    }

    return {
        oneSessionEmit: oneSessionEmit,
        allActiveSessionEmit: function (user, sendData) {
            //todo for send to all active session

        },
        authenticationEmit: function (socketId, sendData) {
            oneSessionEmit(socketId, sendData);
            // io.of('/main').connected[socketId].emit('disconnect');
        },
        contactEmit: function (socketId, sendData) {
            oneSessionEmit(socketId, sendData);
            // io.of('/main').connected[socketId].emit('disconnect');
        },
        chatEmit: function (socketId, sendData) {
            oneSessionEmit(socketId, sendData);
            logd('send in ' + sendData.event, sendData.data);
            // io.of('/main').connected[socketId].emit('disconnect');
        },
        messageEmit: function (socketId, sendData) {
            oneSessionEmit(socketId, sendData);
            logd('send in ' + sendData.event, sendData.data);
            // io.of('/main').connected[socketId].emit('disconnect');
        },
        pushToUserEmit: function (socketId, sendData, channel) {

            oneSessionEmit(socketId, sendData, channel);

            logd(channel, 'send in ' + sendData.event, sendData.data);
            // io.of('/main').connected[socketId].emit('disconnect');
        },
        userEmit: function (socketId, sendData) {
            oneSessionEmit(socketId, sendData);
            logd('send in ' + sendData.event, sendData.data);
            // io.of('/main').connected[socketId].emit('disconnect');
        },
        ErrorEmit: function (socketId, sendData) {
            oneSessionEmit(socketId, sendData);
            console.log("%j", sendData)
            // io.of('/main').connected[socketId].emit('disconnect');
        }
    };
}
