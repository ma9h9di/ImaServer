var logd = require('./Funcion').logd;

module.exports = function (io) {
    function oneSessionEmit(socketId, sendData) {
        var date = new Date();
        sendData.data.time = date.getTime();
        io.of('/main').connected[socketId].emit(sendData.event, sendData.data);
    }

    return {
        oneSessionEmit: oneSessionEmit,
        allActiveSessionEmit: function (user, sendData) {
            //todo for send to all active session

        },
        authenticationEmit: function (socketId, sendData) {
            oneSessionEmit(socketId, sendData)
            // io.of('/main').connected[socketId].emit('disconnect');
        },
        ErrorEmit: function (socketId, sendData) {
            oneSessionEmit(socketId, sendData);
            console.log("%j", sendData)
            // io.of('/main').connected[socketId].emit('disconnect');
        }
    }
}
