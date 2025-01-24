const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["Pending", "Completed", "Done"], default: "Pending" },
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Task', TaskSchema);

// kKa8Sc87UtGq24h_dzipG_a3X40
// api key : 991752723672471
// Cloud name: dtl2l5omv