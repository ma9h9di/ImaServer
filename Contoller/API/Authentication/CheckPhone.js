module.exports = {
    /*
    *
    * */
    call: function (data,user) {
        var result={'registered':user.status!=='active'};
        return result;
    }
}