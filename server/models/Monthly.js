
const mongoose= require('mongoose');
const monthlySchema = new mongoose.Schema({
    year: Number,
    month: String,
    totalWaterDispensed: Number,
});
module.exports = mongoose.model('MonthlyRecord', monthlySchema);