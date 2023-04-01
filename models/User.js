const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  
  image: {
    type: String,
    required: false
  },

  clients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref:"Client"
  }]
  
},
  {
    timestamps: true
  });

module.exports = model("User", userSchema);