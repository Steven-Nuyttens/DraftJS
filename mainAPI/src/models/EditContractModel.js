const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EditContractSchema = new Schema({
    text: {
        type:String,
        required:true
    }
});

const EditContract = mongoose.model('', EditContractSchema)

module.exports = EditContract