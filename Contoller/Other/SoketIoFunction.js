module.exports = function(io) {
    function oneSessionEmit(socketId,user,sendData) {
        var date = new Date();
        sendData.data.time=date.getTime();
        io.to(socketId).emit(sendData.event,sendData.data)
    }
    return {
        oneSessionEmit: oneSessionEmit,
        allActiveSessionEmit: function(user,sendData) {
            //todo for send to all active session

        },
        authenticationEmit: function(socketId,user,sendData) {
            oneSessionEmit(socketId,user,sendData)
            io.to(socketId).disconnect()
        }
    }
}
