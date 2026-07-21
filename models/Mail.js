const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  recipients: [
    {
      type: String,
      required: true,
    },
  ],
  status: {
    type: String,
    default: "Sent",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Mail", mailSchema);