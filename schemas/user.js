const { Schema, model } = require("mongoose");
const userSchema = new Schema({
  _id: Schema.Types.ObjectId,
  userId: String,
  stupid: { type: Number, default: 0 },
  wallet: { type: Number, default: 0 },
  bank: { type: Number, default: 0 },
  items: {
    SB_trophy: { type: Number, default: 0 },
  },
  Lvl: {
    currencyLvl: { type: Number, default: 0 },
    bankAmount: { type: Number, default: 10000 },
  },
  robTime: { type: Date },
  Items: {
    fishingrod: {
      cost: {type: Number, default: 10000},
      amount: {type: Number, default: 0},
    },
    rifle: {
      cost: {type: Number, default: 100000},
      amount: {type: Number, default: 0},
    },
  },
  daily: {
    timestamp: { type: Date, default: new Date()},
    streak: { type: Number, default: 0 },
  },
  streak: {
    gamble: { type: Number, default: 0 },
  },
  userName: String,
  userIcon: { type: String, required: false },
});

module.exports = model("user", userSchema, "users");
