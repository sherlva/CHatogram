const { Schema, model } = require("mongoose");

const AllUsers = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  room: {
    type: String,
    required: true,
  },
  socketid: {
    type: String,
    required: true,
  },
});

module.exports = model("AllUsers", AllUsers);
