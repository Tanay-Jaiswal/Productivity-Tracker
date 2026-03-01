const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
  text: String,
  date: String,
  time: String,
  done: Boolean
})

module.exports = mongoose.model("Task", taskSchema)