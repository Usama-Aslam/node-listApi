const mongoose = require("mongoose");

const List = mongoose.model("List", {
  text: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    default: null
  },
  category: {
    type: String,
    default: "other",
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

module.exports = {
  List
};
