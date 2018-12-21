const logd = require('../../Other/Funcion').logd;


module.exports = function (user) {


    return {

        call: function (data) {
            return new Promise(resolve => {
                user.session[0].lastActive = new Date().getTime();
                user.status = 'active';
                user.firstName = data.first_name;
                user.lastName = data.last_name;
                user.email = data.email;
                resolve({'data': {successful: true}});
            })


        }

    }
};