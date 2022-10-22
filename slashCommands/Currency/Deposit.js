const User = require("../../schemas/user");
const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");
const mongoose = require("mongoose");
module.exports = {
  name: "deposit",
  usage: `/deposit <amount>`,
  category: `Currency`,
  description: "Deposit money to the bank!",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  options: [
    {
      name: `amount`,
      description: `The amount you want to deposit!`,
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
    let bankAmt = userProfile.Lvl.bankAmount

    if (amount.toLowerCase() === "max" || amount.toLowerCase() === "all") {
      newAmount = userProfile.wallet;
    } else if (amount.toLowerCase() === "half") {
      newAmount = userProfile.wallet / 2;
    } else if (!Number.isInteger(parseInt(newAmount))) {
      return interaction.reply({
        content: `Invaild option!\nAvailable options: max, all, half and a vaild integer!`,
      });
    }

    if (newAmount < 1000) {
      return interaction.reply({ content: `Minimum deposit value is **1,000*!` });
    }

    if (userProfile.wallet < newAmount) {
      return interaction.reply({
        content: `Insufficient wallet balance mate`,
        ephemeral: true,
      });
    }

    const newWallet = userProfile.wallet - newAmount;
    const newBank = userProfile.bank + newAmount;
    const newTotal = userProfile.wallet + userProfile.bank;
    const oldWallet = userProfile.wallet;
    const oldBank = userProfile.bank;
    const oldTotal = userProfile.wallet + userProfile.bank;
    if (bankAmt < newBank) {
      return interaction.reply({content: `You can only hold § \`${bankAmt}\` in your bank right now. To hold more, use currency commands and level up more!`})
    }

    await User.updateOne(
      { userId: `${interaction.user.id}` },
      { $set: { wallet: newWallet, bank: newBank } }
    );

    const newBalance = new EmbedBuilder()
      .setTitle(`New Balance!`)
      .setDescription(
        `**Wallet**: **${oldWallet.toLocaleString()}** => **${newWallet.toLocaleString()}** § Coins\n**Bank**: **${oldBank.toLocaleString()}** => **${newBank.toLocaleString()}** § Coins\n**Total**: **${(
          userProfile.wallet + userProfile.bank
        ).toLocaleString()}** § Coins`
      )
      .setTimestamp()
      .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
      .setColor(`White`);

    return interaction.reply({
      content: `I have deposited ${newAmount.toLocaleString()} Sb Coins into your bank!`,
      embeds: [newBalance],
    });
  },
};
