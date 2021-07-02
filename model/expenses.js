const mongoose = require('mongoose')

const expensesSchema = mongoose.Schema({
    datee:{
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    vendor: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    idd:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model("expenses", expensesSchema);