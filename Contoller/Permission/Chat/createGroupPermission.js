const createGroupApi = require('../../API/Chat/createGroupApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');
const logd = require('../../Other/Funcion').logd;

module.exports = {
    check: function (data, user) {
        //todo age ro sakhte tedad gp ina bekhaim kari konim jash injas vali flan ke chizi nadarim vase in ghazie
        return new Promise(async (resolve, reject) => {
            try {

                if (!data.hasOwnProperty('title')) {
                    return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['title']}).jsonErr());
                }
                if ((data.title + '').length < pv.support.minTitleSize) {
                    return reject(new err(pv.errCode.chat.title_size_problem).jsonErr());
                }
                if (!data.hasOwnProperty('description')) {
                    return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['description']}).jsonErr());
                }
                if (!data.hasOwnProperty('userIDs')) {
                    return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['userIDs']}).jsonErr());
                }
                if (data.userIDs.length <= 0) {
                    return reject(new err(pv.errCode.empty_argumnet, undefined, {params: ['userIDs']}).jsonErr());
                }
                data.description = data.description.substring(0, pv.defaultValue.descriptionLength);
                //TODO: age gharar shod tedad groh sakhtano check konim injast
                const createGroup = await createGroupApi.call(data, user);
                return resolve(createGroup);
            } catch (e) {
                return reject(e);
            }
        });


    }
};