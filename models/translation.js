const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const translationSchema = new Schema(
  {
    firebaseUID: {
      type: String,
      required: true,
    },
    greek: String,
    hebrew: String,
    day: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: function (doc, ret) {
        return ret;
      },
    },
  }
);

module.exports = mongoose.model("Translation", translationSchema);
