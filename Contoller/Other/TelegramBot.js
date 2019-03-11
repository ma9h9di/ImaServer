const Telegraf = require('telegraf');
const BOT_TOKEN = "535057232:AAHXvIC1sx9Ge59qyM__AEK_pUUNYSG-g0g";
const FIRST_MESSAGE = "IMA SERVER ERROR";
const ME_CHAT_ID = 282004191;
const bot = new Telegraf(BOT_TOKEN);
const telegram = bot.telegram;
bot.start((ctx) => ctx.reply("Welcome " + ctx.chat.id));
// bot.launch();
console.log("bot Started");

function sendErrMessage(err) {

    const msg = `${FIRST_MESSAGE}\n-----------------\n❗${err.message} ❗\n-----------------\n${err.stack}`;
    return telegram.sendMessage(ME_CHAT_ID, msg);
}

module.exports.sendErrMessage=sendErrMessage;
