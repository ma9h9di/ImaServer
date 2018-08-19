module.exports = {
    /*
    *
    * */
    call: function (user,outputCallBack) {
        outputCallBack({'data': {'registered': user.status === 'active'}});
    }
};