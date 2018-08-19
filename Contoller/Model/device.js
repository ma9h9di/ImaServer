module.exports = {
    CreateNewDevice:function (device) {
        device.IP={};
        device.authentication={
            nextAccessTime:0,
            totalCount:0
        }
        return device;
    },


};