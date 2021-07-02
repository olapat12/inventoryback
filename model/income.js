const mongoose = require('mongoose')

const incomeSchema = mongoose.Schema({
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
    paidby: {
        type: String,
        required: true
    },
    clientname: {
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

module.exports = mongoose.model("incomes", incomeSchema);