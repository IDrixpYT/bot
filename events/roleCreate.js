const { EmbedBuilder, ActivityType, ChannelType } = require("discord.js");
const config = require("../config.json")
const client = require("..")
const mongoose = require('mongoose');
const Guild = require('./../schemas/guild');
client.on("roleCreate", async (role, interaction) => {
  let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
  if (!guildProfile) {
    return;
  }
  if (guildProfile.guildChannelLogs === "") {
    return;
  }
  const logs = await client.channels.cache.get(
    `${guildProfile.guildChannelLogs}`
  );

  var roleHoist = role.hoist;
  var roleMentionable = role.mentionable;

  if (roleHoist === true) {
    roleHoist = "True";
  } else {
    roleHoist = "False";
  }

  if (roleMentionable === true) {
    roleMentionable = "True";
  } else {
    roleMentionable = "False";
  }

  var roleColor = role.hexColor

  if (!roleColor) {
	roleColor = "000000"
  }

  const dateCreated = role.createdAt.toLocaleString();

  const Embed = new EmbedBuilder()
    .setTitle("🆕 Role Created")
    .setDescription(`Role Name: **${role.name}**\nID: **${role.id}**\nHoisted: **${roleHoist}**\nMentionable: **${roleMentionable}**\nCreated since: **${dateCreated}**\nColor: **${role.hexColor}**`)
    .setColor(roleColor)
    .setTimestamp();

  logs
    .send({
      embeds: [Embed],
    })
    .catch((err) => {
      console.log(err);
    });
});
