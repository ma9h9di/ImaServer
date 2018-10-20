var express = require('express');
var router = express.Router();
const db=require('../Contoller/DB/db');
let multer = require('multer');
let upload = multer();

/* POST home page. */
router.post('/', upload.fields([{ name: 'image', maxCount: 1 }]), (request, response,next) => {
    console.log('----------------- on post upload image -----------------------------');
    let imageData=request.files.image[0];

    const promisSaveFile= db.saveFile(imageData);
    promisSaveFile.then(value => {
        console.log(value);
        value.status=true;
        response.json(value);
        // response.sendStatus(200);


    }).catch(error => {
        console.log(error);
        let value={status:false};
        response.json(value);
    });

});
module.exports = router;