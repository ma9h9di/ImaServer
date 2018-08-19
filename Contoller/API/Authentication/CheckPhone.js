module.exports = {
    /*
    *
    * */
    call: function (user) {
        return {'data': {'registered': user.status === 'active'}};
    }
};