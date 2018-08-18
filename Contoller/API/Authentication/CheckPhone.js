module.exports = {
    /*
    *
    * */
    call: function (data, user) {
        return {'data': {'registered': user.status !== 'active'}};
    }
}