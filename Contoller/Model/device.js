module.exports = {
    CreateNewDevice: function (device) {
        return device.authentication = {
            nextAccessTime: 0,
            totalCount: 0
        }
    }
}