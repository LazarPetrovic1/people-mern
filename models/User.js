const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  address: {
    street: {
      type: String,
      default: "123 Street of Nuisance",
      required: false
    },
    city: {
      type: String,
      default: "Novi Sad",
      required: false
    }
  }
});

module.exports = mongoose.model("user", UserSchema);
