const createGroupApi = require('../../API/Chat/createGroupApi');

const err = require('../../Model/error');
const pv = require('../../Other/PublicValue');

module.exports = {
    check: function (data, user, outputCallBack) {
        //todo age ro sakhte tedad gp ina bekhaim kari konim jash injas vali flan ke chizi nadarim vase in ghazie 
        if (!data.hasOwnProperty('title')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['title']}).jsonErr());
            return;
        }
        if ((data.title+'').length<pv.support.minTitleSize) {
            outputCallBack(new err(pv.errCode.chat.title_size_problem).jsonErr());
            return;
        }
        if (!data.hasOwnProperty('description')) {
            outputCallBack(new err(pv.errCode.arguments_not_found, undefined, {params: ['description']}).jsonErr());
            return;
        }
        data.description=data.description.substring(0, pv.defaultValue.descriptionLength);
        //TODO: age gharar shod tedad groh sakhtano check konim injast

        createGroupApi.call(data,user, outputCallBack);


    }
};