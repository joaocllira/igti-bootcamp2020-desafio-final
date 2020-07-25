const mongoose = require('mongoose');

let schema = mongoose.Schema({
    description: String,
    value: Number,
    category: String,
    year: Number,
    month: Number,
    day: Number,
    yearMonth: String,
    yearMonthDay: String,
    type: String,
});

schema.virtual('id').get(() => `${this._id}`);

const TransactionModel = mongoose.model('transaction', schema);

module.exports = TransactionModel;
