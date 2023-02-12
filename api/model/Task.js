const mongoose = require("mongoose");

const { Schema } = mongoose;

const TaskSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  timeline: {
    type: Date,
    require: false
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true
  },
  status: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "taskStatus",
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

module.exports = mongoose.model("tasks", TaskSchema);