"use strict";

const getUser = require('./Users/getUser');
const setUser = require('./Users/setUser');
const joinOrLeave = require('./Chat/joinOrLeave');

const setDevice = require('./Device/setDevice');
const getDevice = require('./Device/getDevice');

const saveFile = require('./File/saveFile');
const getFile = require('./File/getFile');

const getAllContacts = require('./Contact/getAllContacts');
const addContacts = require('./Contact/addContacts');
const updateContact = require('./Contact/updateContact');

const getChat = require('./Chat/getChat');
const getChats = require('./Chat/getChats');
const checkChannelUsername = require('./Chat/checkChannelUsername');
const updateChannelUsername = require('./Chat/updateChannelUsername');
const updateChatByMongoID = require('./Chat/updateChat');
const addOrRemoveMember = require('./Chat/addOrRemoveMember');
const createChat = require('./Chat/createChat');
const getChatsLastTime = require('./Chat/getChatsLastTime');
const setChatsLastTime = require('./Chat/setChatsLastTime');
const addChatImageByMongoID = require('./Chat/addChatImageByMongoID');

module.exports = {
    getUserByPhoneNumber: getUser.getUserByPhoneNumber,
    getUserByToken: getUser.getUserByToken,
    getUserByID: getUser.getUserByID,
    getUsersInfo: getUser.getUsersInfo,
    insertUser: setUser.insertUser,
    deleteDataChatUser: setUser.deleteDataChatUser,
    updateUserByMongoID: setUser.updateUserByMongoID,
    updateUserByPhoneNumber: setUser.updateUserByPhoneNumber,
    updateChatUser: setUser.updateChatUser,
    joinChat: joinOrLeave.joinChat,
    leaveChat: joinOrLeave.leaveChat,

    getDevice: getDevice.getDevice,
    insertDevice: setDevice.insertDevice,
    updateDevice: setDevice.updateDevice,

    saveFile: saveFile.saveFile,
    getFile: getFile.getFile,

    getAllContacts: getAllContacts.getAllContacts,
    addContacts: addContacts.addContacts,
    updateContact: updateContact.updateContact,
    deleteContact: updateContact.deleteContact,

    getChatByChatId: getChat.getChatByChatId,
    getChats: getChats.getChats,
    checkChannelUsername: checkChannelUsername.checkChannelUsername,
    updateChannelUsername: updateChannelUsername.updateChannelUsername,
    updateChatByMongoID: updateChatByMongoID.updateChatByMongoID,
    getChatsLastTime: getChatsLastTime.getChatsLastTime,
    addMemberToChat: addOrRemoveMember.addMemberToChat,
    removeMemberFromChat: addOrRemoveMember.removeMemberFromChat,
    createChat: createChat.createChat,
    setChatsLastTime: setChatsLastTime.setChatsLastTime,
    addChatImageByMongoID: addChatImageByMongoID.addChatImageByMongoID

};

