const Guild = require("../../schemas/guild");
const { ApplicationCommandType } = require("discord.js");
const mongoose = require("mongoose");
module.exports = {
  name: "database",
  usage: `/database`,
  category: `Info`,
  description: "Check bot's database.",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  run: async (client, interaction) => {
    let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
    if (!guildProfile) {
      guildProfile = await new Guild({
        _id: mongoose.Types.ObjectId(),
        guildId: interaction.guild.id,
        guildName: interaction.guild.name,
        guildIcon: interaction.guild.iconURL()
          ? interaction.guild.iconURL()
          : "None.",
      });
      await guildProfile.save().catch(console.error);
      await interaction.reply({
          content: `Server name: ${guildProfile.guildName}`
      })
      console.log(guildProfile);
    } else { 
        await interaction.reply({
            content: `Server ID: ${guildProfile.guildId}`
        })
        console.log(guildProfile);
    }
  },
};
