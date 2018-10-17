var express = require('express');
var router = express.Router();
const db=require('../Contoller/DB/File/saveFile');

/* GET home page. */
router.post('/', (request, response) => {
    console.log('----------------- on post -----------------------------');
    request.on('data', data => {
        console.log('on send Data');
        const promisSaveFile= db.saveFile(data);
        promisSaveFile.then(value => {
            console.log(value);

        }).catch(error => {
            console.log(error);

        });

    }).on('close', () => {
        console.log('close send Data');
    });
});
module.exports = router;
