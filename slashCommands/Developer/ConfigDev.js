const User = require("../../schemas/user");
const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");
const mongoose = require("mongoose");
module.exports = {
  name: "configdev",
  usage: `/configdev <sub-command> <options>`,
  category: `Currency`,
  ownerOnly: true,
  description: "Check current balance.",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  options: [
    {
      name: `set`,
      description: `Add to a existing value in mongoDB database of a user!`,
      type: 1,
      options: [
        {
          name: "user",
          description: "User's balance",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "amount",
          description: `The amount of SB coins to set for user's value`,
          type: ApplicationCommandOptionType.Number,
          required: true,
        },
        {
          name: "type",
          description: `Where are you transferring all this money too?`,
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: `Bank`,
              value: `bank`,
            },
            {
              name: `Wallet`,
              value: `wallet`,
            },
            {
              name: `Stupidness`,
              value: `stupid`,
            },
            {
              name: `Wallet`,
              value: `wallet`,
            },
            {
              name: `Level`,
              value: `lvl`,
            },
          ],
        },
      ],
    },
    {
      name: `remove`,
      description: `Remove to a existing value in mongoDB database of a user!`,
      type: 1,
      options: [
        {
          name: "user",
          description: "The user that you want to take control of",
          type: ApplicationCommandOptionType.User,
          required: true,
        },
        {
          name: "amount",
          description: `The amount of SB coins to remove for user's balance`,
          type: ApplicationCommandOptionType.Number,
          required: true,
        },
        {
          name: "type",
          description: `What type?`,
          type: ApplicationCommandOptionType.String,
          required: true,
          choices: [
            {
              name: `Bank`,
              value: `bank`,
            },
            {
              name: `Wallet`,
              value: `wallet`,
            },
            {
              name: `Stupidness`,
              value: `stupid`,
            },
            {
              name: `Wallet`,
              value: `wallet`,
            },
            {
              name: `Level`,
              value: `lvl`,
            },
          ],
        },
      ],
    },
  ],
  run: async (client, interaction) => {
    const member = interaction.options.get("user")?.user || interaction.user;
    const amount = interaction.options.get("amount").value;
    const transfer = interaction.options.get("type")?.value || "Bank";
    let userProfile = await User.findOne({ userId: member.id });
    if (member.bot) {
      return interaction.reply({
        content: `Bot's dont't got that privilege, and so do black people.`,
      });
    }
    if (!userProfile.userId && interaction.user.id != member.id) {
      return interaction.reply({
        content: `This user hasn't created a profile yet..`,
      });
    }

    if (interaction.options._subcommand === "set") {
      if (transfer === "bank") {
        const amountbank = amount + userProfile.bank;
        await User.updateOne(
          { userId: `${member.id}` },
          { $set: { bank: amountbank } }
        );
      } else if (transfer === "wallet") {
        const amountwallet = amount + userProfile.wallet;
        await User.updateOne(
          { userId: `${member.id}` },
          { $set: { wallet: amountwallet } }
        );
      } else if (transfer === "lvl") {
        const lvlAmnt = userProfile.Lvl.currencyLvl + amount
        await User.updateOne(
          { userId: `${member.id}` },
          { $set: { Lvl: { currencyLvl: lvlAmnt } } }
        );
      } else if (transfer === "stupid") {
        const stupidAmt = userProfile.stupid + amount
        await User.updateOne(
          { userId: `${member.id}` },
          { $set: { stupid: stupidAmt } }
        );
      }
      return interaction.reply({
        content: `I have set a new value for **${member.tag}** **${transfer}** to the value of **${amount}**.`,
        ephemeral: true,
      });
    }
    if (interaction.options._subcommand === "remove") {
      if (transfer === "bank") {
        const amountbank = amount - userProfile.bank;
        await User.updateOne(
          { userId: `${member.id}` },
          { $set: { bank: amountbank } }
        );
      } else if (transfer === "wallet") {
        const amountwallet = amount - userProfile.wallet;
        await User.updateOne(
          { userId: `${member.id}` },
          { $set: { wallet: amountwallet } }
        );
      } else if (transfer === "lvl") {
        const lvlAmnt = userProfile.Lvl.currencyLvl - amount
        await User.updateOne(
          { userId: `${member.id}` },
          { $set: { Lvl: { currencyLvl: lvlAmnt } } }
        );
      } else if (transfer === "stupid") {
        const stupidAmt = userProfile.stupid - amount
        await User.updateOne(
          { userId: `${member.id}` },
          { $set: { stupid: stupidAmt } }
        );
      }
      return interaction.reply({
        content: `I have removed **${amount}** for **${member.tag}**'s  **${transfer}**`,
        ephemeral: true,
      });
    }
  },
};
