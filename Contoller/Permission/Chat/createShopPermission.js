const createShopApi = require('../../API/Chat/createShopApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data, user, outputCallBack) {
        //todo age ro sakhte tedad gp ina bekhaim kari konim jash injas vali flan ke chizi nadarim vase in ghazie
        if (!data.hasOwnProperty('chatID')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
            return;
        }
        if (!data.hasOwnProperty('description')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['description']}).jsonErr());
            return;
        }
        data.description=data.description.substring(0, pv.defaultValue.descriptionLength);

        //TODO: age gharar shod tedad groh sakhtano check konim injast

        createShopApi.call(data,user, outputCallBack);


    }
};