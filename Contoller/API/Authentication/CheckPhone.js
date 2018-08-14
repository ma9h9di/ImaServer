module.exports = {
    /*
    *
    * */
    check: function (data,user) {
        var bannd=user.spam;
        var result={'registered':user.status!=='deactive','banned':user.spam}
        return ;
    }
}