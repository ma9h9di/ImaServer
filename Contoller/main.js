var mainPremission = require('./Premission/MainPremissionCheck');
module.exports = {

    
    listen: function (io) {
        console.log('line 5');
        // var idc = 0;
        // io.path('/myownpath');
        io.of('/main').on('connection', function (client) {
            console.log('open socket ' + client.id);
            client.on('run', function (msg, err) {
                //todo decrypt msg
                var decrypt_msg=msg;
                console.log(msg);
                console.log(msg.phone_number);
                //db.getUserByPhoneNumber();

                // var result={'registerd':0,'banned':true}
                client.emit(decrypt_msg.method + '_result',mainPremission.check(decrypt_msg))

                if (err != undefined){
                    //todo err handel

                }
            });
        });
        io.sockets.on('disconnection', function (client) {
            console.log('disconnection socket ' + client.id);
        });
        return {slm:"hello"}
        try{
            
        }catch (e) {
            
        }
    }

}
