module.exports = {

    
    lissen: function (io) {
        console.log('line46');
        var idc = 0;
        // io.path('/myownpath');
        io.of('/').on('connection', function (client) {
            console.log('open socket ' + client.id);
            client.on('checkPhone', function (msg, err) {
                console.log(msg);
                console.log(msg['phone_number']);
                //db.getUserByPhoneNumber();

                var result={'registerd':0,'banned':true}
                client.emit('checkPhone_result',result)

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
