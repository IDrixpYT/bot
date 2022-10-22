const User = require("../../schemas/user");
const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");
const mongoose = require("mongoose");
const user = require("../../schemas/user");
module.exports = {
  name: "withdraw",
  usage: `/withdraw <amount>`,
  category: `Currency`,
  description: "Withdraw money to the wallet!",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  options: [
    {
      name: `amount`,
      description: `A integer like "123", or a relative keyword like "max", "all", and "half"`,
      type: ApplicationCommandOptionType.String,
      required: true,
      //   max_value: 1e4,
      //   min_value: 1,
    },
  ],
  run: async (client, interaction) => {
    const amount = interaction.options.get("amount").value;
    var newAmount = amount;
    let userProfile = await User.findOne({ userId: interaction.user.id });

    if (amount.toLowerCase() === "max" || amount.toLowerCase() === "all") {
      newAmount = userProfile.bank;
    } else if (amount.toLowerCase() === "half") {
      newAmount = userProfile.bank / 2;
    } else if (!Number.isInteger(parseInt(newAmount))) {
      return interaction.reply({
        content: `*Invaild option*!\nAvailable options: **max**, **all**, **half** and a vaild **integer**!`,
        ephemeral: true
      });
    }

    if (newAmount < 1000) {
      return interaction.reply({ content: `*Invaild option*!\nMinimum deposit value is **1,000**!`, ephemeral: true, });
    }

    if (!userProfile) {
      return interaction.reply({
        content: `How are you going to withdraw without having a single cent in your bank.\nCreate a profile using \`/start\`!`,
        ephemeral: true,
      });
    }

    if (userProfile.bank < newAmount) {
      return interaction.reply({
        content: `Insufficient bank balance mate`,
        ephemeral: true,
      });
    }

    const newWallet = userProfile.wallet + newAmount;
    const newBank = userProfile.bank - newAmount;
    const newTotal = userProfile.wallet + userProfile.bank
    const oldWallet = userProfile.wallet;
    const oldBank = `${userProfile.bank}`;
    const oldTotal = userProfile.wallet + userProfile.bank;

    await User.updateOne(
      { userId: `${interaction.user.id}` },
      { $set: { wallet: newWallet, bank: newBank } }
    );

    const newBalance = new EmbedBuilder()
      .setTitle(`New Balance!`)
      .setDescription(
        `**Wallet**: **${(oldWallet).toLocaleString()}** => **${(newWallet).toLocaleString()}** § Coins\n**Bank**: **${(oldBank).toLocaleString()}** => **${
          (newBank).toLocaleString()
        }** § Coins\n**Total**: **${
          (userProfile.wallet + userProfile.bank).toLocaleString()
        }** § Coins`
      )
      .setTimestamp()
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setColor(`White`);

    return interaction.reply({
      content: `I have withdrawed ${(amount).toLocaleString()} Sb Coins into your wallet!`,
      embeds: [newBalance],
    });
  },
};
