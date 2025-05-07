const mongoose = require('mongoose');
const itemSchema = new mongoose.Schema({
    site: String,
    phoneNumber: String,
    fullSms: String,
    date: String,
    "dateTime":String,
    "epoch":Number,
    "tds":Number,
    "ph":Number,
    "totalWaterDispensed":Number,
    "totalAmountCollected":Number,
    "dispenserType":String,
    "recordType":String,
    "waterDispensedTap1":Number,
    "waterDispensedTap2":Number,
    "waterDispensedTap3": Number,
    "tempOfTank1":Number,
    "tempOfTank2":Number,
    "volumeOfTank1":Number,
    "volumeOfTank2":Number,
    "siteId":String,
});

module.exports = mongoose.model('dispenser_records', itemSchema);
