const mongoose = require("mongoose");

const followeSchema = new mongoose.Schema(
  {
    follower: {
      type: String,
    },
    followee: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const followModel = mongoose.model("follows", followeSchema);

module.exports = followModel;