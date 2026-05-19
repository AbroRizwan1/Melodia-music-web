const mongoose = require("mongoose");

const practiceSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const practiceModel = mongoose.model("practice", practiceSchema);

module.exports = practiceModel;
