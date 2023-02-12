const mongoose = require("mongoose");

const { Schema } = mongoose

const TaskStatusSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isActive: {
    type: Boolean,
    required: false,
    default: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: null
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});


module.exports = mongoose.model("taskStatus", TaskStatusSchema);