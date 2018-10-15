const getPinApi = require('../../API/Chat/getPinApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data, user, outputCallBack) {
        getPinApi.call(data,user, outputCallBack);
    }
};