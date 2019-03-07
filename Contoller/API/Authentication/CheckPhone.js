module.exports = {
    /*input:
     {
       "method":"checkPhone",
       "data":{
          "phone_number":"+989337382831",
          "country":"iran",
          "language":"English",
          "device":{
             "platform":"android",
             "unique_device_key":"82c92a3236ba1ec5",
             "platform_version":"24",
             "model":"Android SDK built for x86_64_generic_x86_64"
          }
       },
       "token":""
    }
    *
    *
    *
    * output:
     {
        'data': {
            'registered': false
         }
     }
    * */
    call: function (user) {
        return new Promise(resolve => {
            resolve({'data': {'registered': user.status === 'active'}});
        })
    }
};