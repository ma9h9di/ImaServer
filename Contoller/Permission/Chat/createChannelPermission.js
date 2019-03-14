const createChannelApi = require('../../API/Chat/createChannelApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data, user) {
        return new Promise(async (resolve, reject) => {
            try {
                //todo age ro sakhte tedad gp ina bekhaim kari konim jash injas vali flan ke chizi nadarim vase in ghazie
                if (!data.hasOwnProperty('title')) {
                    return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['title']}).jsonErr());
                }
                if ((data.title + '').length < pv.support.minTitleSize) {
                    return reject(new err(pv.errCode.chat.title_size_problem).jsonErr());
                }
                if (!data.hasOwnProperty('description')) {
                    return reject(new err(pv.errCode.arguments_not_found, undefined, {params: ['description']}).jsonErr());
                }
                data.description = data.description.substring(0, pv.defaultValue.descriptionLength);
                //TODO: age gharar shod tedad groh sakhtano check konim injast
                const createChannel = await createChannelApi.call(data, user);
                return resolve(createChannel);

            } catch (e) {
                return reject(e);

            }
        });


    }
};