var express = require('express');
var router = express.Router();
const db = require('../Contoller/DB/db');
const err = require('../Contoller/Model/error');
const pv = require('../Contoller/Other/PublicValue');

/* POST home page. */
router.post('/', async (request, response, next) => {
    console.log('----------------- on post get image -----------------------------');
    if (request.body.hasOwnProperty('fileID')) {
        const imageID = request.body.fileID;
        const downloadFilePromise = await db.getFile(imageID);
        downloadFilePromise.pipe(response);

    } else {
        response.json(new err(pv.errCode.invalid_arguments).jsonErr());
    }
});

router.get('/',async function (req, res) {
    const data = req.query;
    if (!data.hasOwnProperty('method')) {
        res.json(new err(pv.errCode.arguments_not_found, undefined, {params: ['method']}).jsonErr());
        return
    }
    if (data.hasOwnProperty('fileID')) {
        const imageID = data.fileID;
        switch (data.method) {
            case pv.api.downloadApi.profileImage: {
                try {
                    const downloadFilePromise = await db.getFile(imageID, pv.fileCategory.profile);
                    try {
                        downloadFilePromise.pipe(res);
                    }
                    catch (e) {
                        res.json(new err(pv.errCode.data_not_found).jsonErr());
                    }
                }
                catch (error) {
                    res.json(new err(pv.errCode.data_not_found).jsonErr());

                }
                break;
            }
            default: {
                res.json(new err(pv.errCode.method_not_found).jsonErr());
            }
        }

    } else {
        res.json(new err(pv.errCode.invalid_arguments).jsonErr());
    }
});
module.exports = router;
