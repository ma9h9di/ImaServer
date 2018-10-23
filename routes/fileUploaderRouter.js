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
const ObjectID=require('mongodb').ObjectID;
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
const insertFile = function (fileID, funcResult) {
    const promisSaveFile = db.saveFile(fileID);
    promisSaveFile.then(funcResult).catch(catchHandelr);
};
router.post('/', upload.fields([{name: 'fileID', maxCount: 1}, {name: 'token', maxCount: 1},
    {name: 'method', maxCount: 1}]), (request, response, next) => {
    console.log('----------------- on post upload image -----------------------------');
    const body = request.body;
    let token = body.token;
    db.getUserByToken(token, user => {
        let fileID = request.files.fileID[0];

        if (user && fileID) {
            fileID.metadata={userID : user._id};
            let method = body.method;
            let funcResult;
            switch (method) {
                case pv.api.uploadApi.profileUpload.user: {
                    fileID.metadata.type = pv.fileType.UserProfileImage;
                    fileID.metadata.category = pv.fileCategory.profile;
                    funcResult = (value) => {
                        addUserProfileImage(user, value, () => {
                            value.status = true;
                            response.json(value);
                        })
                    };
                    insertFile(fileID, funcResult);
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
                    const PromiseUserHasThisChat = userHasThisChat(body.chatID, user.chats, pv.support.access.admin);
                    PromiseUserHasThisChat.then(chatUser => {
                        funcResult = (value) => {
                            addChatProfileImage({_id:new ObjectID(body.chatID)}, value, (result) => {
                                if (!result.hasOwnProperty('error')) {
                                    value.status = true;
                                    response.json(value);
                                } else {
                                    response.json(result);
                                }
                            })
                        };
                        insertFile(fileID,funcResult);
                    }).catch(error => {
                        response.json(error);
                    });
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

});
module.exports = router;
