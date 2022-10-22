const User = require("../../schemas/user");
const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");
const mongoose = require("mongoose");
module.exports = {
  name: "pay",
  usage: `/pay <@user> <amount>`,
  category: `Currency`,
  description: "Pays money to provided user",
  type: ApplicationCommandType.ChatInput,
  cooldown: 30000,
  options: [
    {
      name: "user",
      description: "Who do you owe money too?",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: `amount`,
      description: `Amount to give the user!`,
      type: ApplicationCommandOptionType.Integer,
      required: true,
      max_value: 1e5,
      min_value: 1,
    },
  ],
  run: async (client, interaction) => {
    const member = interaction.options.get("user").user;
    const amount = interaction.options.get("amount").value;
    let memberProfile = await User.findOne({ userId: member.id });
    let userProfile = await User.findOne({ userId: interaction.user.id });

    if (member.bot) {
      return interaction.reply({
        content: `Bot's dont't got that privilege.`,
        ephemeral: true
      });
    }

    if (!userProfile) {
      return interaction.reply({
        content: `How are you going to payin without having a single cent in your bank.\nCreate a profile using \`/start\`!`,
        ephemeral: true
      });
    } else if (!memberProfile) {
      return interaction.reply({
        content: `Member hasn't created a profile yet\nThe user must use /balance to create a profile!`,
        ephemeral: true,
      });
    }

    if (member.id === interaction.user.id) {
      return interaction.reply({
        content: `Unfortunately it's not that easy, better luck next time.`,
        ephemeral: true,
      });
    }

    if (userProfile.wallet < amount) {
      return interaction.reply({
        content: `Insufficient wallet balance mate`,
        ephemeral: true,
      });
    }

    const newrecieverWallet = memberProfile.wallet + amount;
    const newsenderWallet = userProfile.wallet - amount;

    await User.updateOne(
      { userId: `${interaction.user.id}` },
      { $set: { wallet: newsenderWallet } }
    );
    await User.updateOne(
      { userId: `${member.id}` },
      { $set: { wallet: newrecieverWallet } }
    );

    await interaction.reply({ content: `Success!\n**${interaction.user.tag}** has sent **${amount.toLocaleString()}** Sb Coins to **${member.tag}**!` });
  },
};
