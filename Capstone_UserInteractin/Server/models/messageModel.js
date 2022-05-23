const mongoose = require("mongoose");
const {Schema} = mongoose;

const MessageSchema = new Schema(
  {
    message: {
      text: { 
        type: String, 
        required: true },
    },
    users: Array,
    
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", MessageSchema);