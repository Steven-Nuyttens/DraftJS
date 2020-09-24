const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EditContractSchema = new Schema({
    content: {
        type:Object
    }
});

const EditContractModel = mongoose.model('', EditContractSchema)

module.exports = EditContractModel