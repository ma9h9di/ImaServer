const getPinApi = require('../../API/Chat/getPinApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data, user) {
        return new Promise(async (resolve,reject) => {
            try {
                const getPin=await getPinApi.call(data, user);
                resolve(getPin);
            } catch (e){
                reject(e);
            }
        });
    }
};