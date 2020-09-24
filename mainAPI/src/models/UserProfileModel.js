const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userProfileSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  pswd: {
    type: String,
    required: true,
  },
});

//validation

const UserProfile = mongoose.model('userProfile', userProfileSchema)

module.exports = UserProfile;
