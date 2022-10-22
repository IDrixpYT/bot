const fs = require("fs");
const {
  EmbedBuilder,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  ActionRowBuilder,
  ButtonBuilder,
} = require("discord.js");
module.exports = {
  name: "mid",
  usage: `mid`,
  category: `Info`,
  ownerOnly: true,
  description: "test cmd for the owner",
  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction) => {
    filenames = fs.readdirSync('./slashCommands/Fun');

    console.log("\nCurrent directory filenames:");
    filenames.forEach((file) => {
      console.log(file.replace('.js', ''));
    });
  },
};
