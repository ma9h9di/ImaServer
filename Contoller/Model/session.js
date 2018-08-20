var crypto = require('crypto');
function generateToken(){
    var date=new Date();
    return crypto.randomBytes(64).toString('hex')+(date.getTime()+'').substr(5);
};
module.exports = {
    CreateNewSession:function (device,app,socketId,index) {
        var date=new Date();
        var d=new Date();
        d.setFullYear(2030);
        var session={
            sessionId:index,
            token: generateToken(),
            tokenExpireDate: d.getTime(),
            createdDate: date.getTime(),
            lastActive: date.getTime(),
            SocketID:socketId,
            device: device,
            app:{
                appVersion:app.appVersion,
                appName:app.appName,
                API_Version:app.API_Version,
                notificationService:app.notificationService,
            }

        };

        return session;
    },


};