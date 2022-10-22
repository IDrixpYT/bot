const Guild = require("../../schemas/guild");
const {
  EmbedBuilder,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  ActionRowBuilder,
  ButtonBuilder,
} = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  name: `config`,
  category: `Utility`,
  type: ApplicationCommandType.ChatInput,
  usage: `/config <enable/disable> <category>`,
  description: `Enable or disable a category!`,
  cooldown: 10000,
  userPerms: "Administrator",
  botPerms: "Administrator",
  options: [
    {
      name: `enable`,
      description: `Choose a category to enable!`,
      type: 1,
      options: [
        {
          name: `category`,
          description: `Choose a category to enable!`,
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: `Currency`,
              value: `currency`,
            },
            {
              name: `Moderation`,
              value: `moderation`,
            },

            {
              name: `Fun`,
              value: `fun`,
            },
          ],
        },
      ],
    },

    {
      name: `disable`,
      description: `Choose a category to disable!`,
      type: 1,
      options: [
        {
          name: `category`,
          description: `Choose a category to disable!`,
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: `Currency`,
              value: `currency`,
            },
            {
              name: `Moderation`,
              value: `moderation`,
            },

            {
              name: `Fun`,
              value: `fun`,
            },
          ],
        },
      ],
    },
  ],
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
    }

    if (interaction.options._subcommand === "enable") {
      const category = interaction.options.get(`category`).value;

      if (category === "currency") {
        if (guildProfile.CurrencyEnabled === true) {
          return interaction.reply({
            content: `This category is already enabled! :)`,
          });
        }
        await Guild.updateOne(
          { guildId: `${interaction.guild.id}` },
          { $set: { CurrencyEnabled: true } }
        );

        return interaction.reply({
          content: `I have **enabled** Currency for **${interaction.guild.name}**!`,
        });
      }

      if (category === "moderation") {
        if (guildProfile.ModerationEnabled === true) {
          return interaction.reply({
            content: `This category is already enabled! :)`,
          });
        }
        await Guild.updateOne(
          { guildId: `${interaction.guild.id}` },
          { $set: { ModerationEnabled: true } }
        );

        return interaction.reply({
          content: `I have **enabled** Moderation for **${interaction.guild.name}**!`,
        });
      }

      if (category === "fun") {
        if (guildProfile.FunEnabled === true) {
          return interaction.reply({
            content: `This category is already enabled! :)`,
          });
        }
        await Guild.updateOne(
          { guildId: `${interaction.guild.id}` },
          { $set: { FunEnabled: true } }
        );

        return interaction.reply({
          content: `I have **enabled** Fun commands for **${interaction.guild.name}**!`,
        });
      }
    }

    if (interaction.options._subcommand === "disable") {
      const category = interaction.options.get(`category`).value;

      if (category === "currency") {
        if (guildProfile.CurrencyEnabled === false) {
          return interaction.reply({
            content: `This category is already disabled! :)`,
          });
        }
        await Guild.updateOne(
          { guildId: `${interaction.guild.id}` },
          { $set: { CurrencyEnabled: false } }
        );

        return interaction.reply({
          content: `I have **disabled** Currency for **${interaction.guild.name}**!`,
        });
      }

      if (category === "moderation") {
        if (guildProfile.ModerationEnabled === false) {
          return interaction.reply({
            content: `This category is already disabled! :)`,
          });
        }
        await Guild.updateOne(
          { guildId: `${interaction.guild.id}` },
          { $set: { ModerationEnabled: false } }
        );

        return interaction.reply({
          content: `I have **disabled** Moderation for **${interaction.guild.name}**!`,
        });
      }

      if (category === "fun") {
        if (guildProfile.FunEnabled === false) {
          return interaction.reply({
            content: `This category is already disabled! :)`,
          });
        }
        await Guild.updateOne(
          { guildId: `${interaction.guild.id}` },
          { $set: { FunEnabled: false } }
        );

        return interaction.reply({
          content: `I have **disabled** Fun commands for **${interaction.guild.name}**!`,
        });
      }
    }
  },
};
