const { Schema, model } = require("mongoose");
const guildSchema = new Schema({
  _id: Schema.Types.ObjectId,
  guildId: String,
  guildName: String,
  guildIcon: { type: String, required: false },
  guildChannelLogs: String,
  CurrencyEnabled: { type: String, default: "true" }, 
  FunEnabled: { type: String, default: "true" }, 
  InfoEnabled: { type: String, default: "true" }, 
  ModerationEnabled: { type: String, default: "true" }, 
  UtilityEnabled: { type: String, default: "true" }, 
});

module.exports = model("Guild", guildSchema, "guilds");
