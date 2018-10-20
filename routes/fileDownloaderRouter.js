var express = require('express');
var router = express.Router();
const db=require('../Contoller/DB/db');
const err=require('../Contoller/Model/error');
const pv=require('../Contoller/Other/PublicValue');

/* POST home page. */
router.post('/', (request, response,next) => {
    console.log('----------------- on post get image -----------------------------');
    if (request.body.hasOwnProperty('fileID')) {
        const imageID = request.body.fileID;
        const downloadFilePromise = db.getFile(imageID);
        downloadFilePromise.then(value => {
            value.pipe(response);
        })
    }else{
        response.json(new err(pv.errCode.invalid_arguments).jsonErr());
    }
});
module.exports = router;
