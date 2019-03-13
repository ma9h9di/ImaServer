const pv=require('./PublicValue');
hashTable = {};

function scheduleWork(key, work, timer=pv.defaultValue.timeToSendNotif) {
    hashTable[key] = setTimeout(function () {
        work();
    }, timer);
}

function removeWork(key) {
    if (hashTable[key] !== undefined) {
        clearTimeout(hashTable[key]);
        delete hashTable[key];
    }
}

module.exports.scheduleWork=scheduleWork;
module.exports.removeWork=removeWork;