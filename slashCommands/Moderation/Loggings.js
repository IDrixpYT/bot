const Guild = require("../../schemas/guild");
const {
  EmbedBuilder,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  ActionRowBuilder,
  ButtonBuilder,
} = require("discord.js");
const config = require("../../config.json");
const mongoose = require("mongoose");
module.exports = {
  name: "loggings",
  usage: `/loggings <set/remove/check> | channel`,
  category: `Moderation`,
  description: "Set or remove channel loggings",
  type: ApplicationCommandType.ChatInput,
  cooldown: 60000,
  userPerms: "Administrator",
  botPerms: "Administrator",
  options: [
    {
      name: `set`,
      description: `Set guild loggings!`,
      type: 1,
      options: [
        {
          name: "channel",
          description: `Select a channel to set as guild loggings`,
          type: ApplicationCommandOptionType.Channel,
          required: true,
        },
      ],
    },
    {
      name: `remove`,
      description: `Remove current guild loggings!`,
      type: 1,
    },
    {
      name: `check`,
      description: `Check the current guild loggings channel!`,
      type: 1,
    },
  ],
  run: async (client, interaction) => {
    if (interaction.options._subcommand === "set") {
      const channellog = interaction.options.get("channel").channel;
      const channellogId = channellog.id;
      let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });

      if (!guildProfile) {
        guildProfile = await Guild.create({
          _id: mongoose.Types.ObjectId(),
          guildId: interaction.guild.id,
          guildName: interaction.guild.name,
          guildIcon: interaction.guild.iconURL()
            ? interaction.guild.iconURL()
            : "None.",
        });
        await Guild.updateOne(
          { guildId: `${interaction.guild.id}` },
          { $set: { guildChannelLogs: channellogId } }
        );
        interaction.reply({
          content: `I have set ${channellog} as guild loggings!`,
        });
        const embed = new EmbedBuilder()
          .setTitle(`I have set loggings to ${channellog.name}!`)
          .setDescription(
            `Here's what I can log!\n**Channels**: Create, Delete, and Update\n**Roles**: Create, Delete and Update\n**Guild**: MemberAdd, MemberRemove, MemberUpdate, BanAdd, and BanRemove.`
          )
          .setTimestamp()
          .setThumbnail(interaction.guild.iconURL())
          .setColor(`Blue`);
        return channellog.send({
          content: `${interaction.user}`,
          embeds: [embed],
        });
      }

      if (guildProfile.guildChannelLogs === "") {
        await Guild.updateOne(
          { guildId: `${interaction.guild.id}` },
          { $set: { guildChannelLogs: channellogId } }
        );
      } else {
        await Guild.updateOne(
          { guildId: `${interaction.guild.id}` },
          { $set: { guildChannelLogs: channellogId } }
        );
      }
      interaction.reply({
        content: `I have set ${channellog} as guild loggings!`,
      });
    }

    if (interaction.options._subcommand === "remove") {
      let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });

      if (!guildProfile.guildChannelLogs) {
        return interaction.reply(
          `There isn't any channel set as loggings currently.`
        );
      } else {
        interaction.reply({
          content: `I have remove the current channel for guild loggings!\nWhich is <#${guildProfile.guildChannelLogs}>`,
        });
        guildProfile = await Guild.updateOne({
          guildChannelLogs: ``,
        });
      }
    }

    if (interaction.options._subcommand === "check") {
      let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
      let channel = guildProfile.guildChannelLogs;
      if (!channel) {
        return interaction.reply({
          content: `There isn't any current guild loggings channel! To setup one do /loggings set <channel>`,
        });
      }
      interaction.reply({
        content: `The current guild loggings channel for ${interaction.guild.name} is <#${channel}>!`,
      });
    }
  },
};
