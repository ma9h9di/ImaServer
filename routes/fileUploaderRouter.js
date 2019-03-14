const express = require('express');
const router = express.Router();
const db = require('../Contoller/DB/db');
let multer = require('multer');
let upload = multer();
const err = require('../Contoller/Model/error');
const pv = require('../Contoller/Other/PublicValue');
const addUserProfileImage = require('../Contoller/API/User/addUserProfileImage').call;
const addChatProfileImage = require('../Contoller/API/Chat/addChatProfileImage').call;
const userHasThisChat = require('../Contoller/Permission/Chat/chatMainPermissionCheck').userHasThisChat;
const ObjectID = require('mongodb').ObjectID;
/*
* value => {
                        if (!user.hasOwnProperty('profileImage'))
                            user.profileImage=[];
                        user.profileImage.push(value._id);
                        user.lastProfileChange=new Date().getTime();
                        user.lastActivityTime=new Date().getTime();
                        db.updateUserByMongoID(['lastProfileChange','lastActivityTime','profileImage'],user,()=>{
                            value.status = true;
                            response.json(value);
                        });

                    }
* */
/* POST home page. */
const catchHandelr = function (error) {

    console.log(error);
    let value = {status: false};
    response.json(value);

};

async function insertFile(fileID) {
    return new Promise(async (resolve, reject) => {
        try {
            const promisSaveFile = await db.saveFile(fileID);
            return resolve(promisSaveFile)
        } catch (e) {
            catchHandelr(e);
        }
    });

};
router.post('/', upload.fields([{name: 'fileID', maxCount: 1}, {name: 'token', maxCount: 1},
    {name: 'method', maxCount: 1}]), async (request, response, next) => {
    console.log('----------------- on post upload image -----------------------------');
    const body = request.body;
    let token = body.token;
    const user = await db.getUserByToken(token);
    let fileID = request.files.fileID[0];

    if (user && fileID) {
        fileID.metadata = {userID: user._id};
        let method = body.method;
        switch (method) {
            case pv.api.uploadApi.profileUpload.user: {
                fileID.metadata.type = pv.fileType.UserProfileImage;
                fileID.metadata.category = pv.fileCategory.profile;
                const funcResult = await insertFile(fileID);
                const result = await addUserProfileImage(user, funcResult);
                if (!result.hasOwnProperty('error')) {
                    funcResult.status = true;
                    response.json(funcResult);
                } else {
                    response.json(result);
                }
                break;
            }
            case pv.api.uploadApi.profileUpload.chat: {
                if (body.chatID === undefined) {
                    response.json(new err(pv.errCode.arguments_not_found, undefined, {params: ['chatID']}).jsonErr());
                    return
                }
                fileID.metadata.type = pv.fileType.ChatProfileImage;
                fileID.metadata.category = pv.fileCategory.profile;
                fileID.metadata.chatID = body.chatID;
                try {
                    await userHasThisChat(body.chatID, user.chats, pv.support.access.admin);
                    const funcResult = await insertFile(fileID);
                    const result = await addChatProfileImage({_id: new ObjectID(body.chatID)}, funcResult)

                    if (!result.hasOwnProperty('error')) {
                        funcResult.status = true;
                        response.json(funcResult);
                    } else {
                        response.json(result);
                    }

                } catch (error) {
                    response.json(error);
                }
                break;
            }
            default: {
                response.json(new err(pv.errCode.method_not_found).jsonErr());
            }
        }
    } else {
        response.json(new err(pv.errCode.token_user_not_found).jsonErr());
    }


});
module.exports = router;
