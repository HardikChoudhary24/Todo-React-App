const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})
const userTasksSchema = new mongoose.Schema({
    name: String,
    email: String,
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Items"
    }]
})

const itemsSchema = new mongoose.Schema({
    description: String,
    isDone: Boolean
})

module.exports = {
  Users: mongoose.model("User", userSchema),
  UserTasks: mongoose.model("UserTask", userTasksSchema),
  Items: mongoose.model("Items", itemsSchema),
};