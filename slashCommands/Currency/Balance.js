const User = require("../../schemas/user");
const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");
const mongoose = require("mongoose");
module.exports = {
  name: "balance",
  usage: `/balance <@user>`,
  category: `Currency`,
  // ownerOnly: true,
  description: "Check current balance.",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  options: [
    {
      name: "user",
      description: "User's balance",
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  run: async (client, interaction) => {
    const member = interaction.options.get("user")?.user || interaction.user;
    let userProfile = await User.findOne({ userId: member.id });
    let bankAmount = userProfile.Lvl.bankAmount
    if (member.bot) {
      return interaction.reply({
        content: `Bot's dont't got that privilege`,
        ephemeral: true
      });
    }
    if (!userProfile && interaction.user.id != member.id) {
      return interaction.reply({
        content: `This user hasn't created a balance yet..`,
        ephemeral: true
      });
    } else if (!userProfile.userId) {
      return interaction.reply({content: `You haven't started a profile yet!\nUse \`/start\` to start a new account!`})
    } 
    if (1===1) {
      if (bankAmount < userProfile.bank) {
        let wallet = userProfile.bank + userProfile.wallet;
        await User.updateOne(
          { userId: `${member.id}` },
          { $set: {wallet: wallet, bank: 0 } }
        );
      }
  
      const total = userProfile.wallet + userProfile.bank
      const balanceEmbed = new EmbedBuilder()
        .setTitle(`${member.tag}'s Balance`)
        .setDescription(
          `**Wallet**: § ${userProfile.wallet.toLocaleString()}\n**Bank**: § ${
            userProfile.bank.toLocaleString()
          }/${bankAmount.toLocaleString()}\n**Total**: § ${
            total.toLocaleString()
          }`
        )
        .setTimestamp()
        .setThumbnail(member.displayAvatarURL({ dynamic: true }))
        .setColor(`Green`);
      await interaction.reply({
        embeds: [balanceEmbed],
      });
      console.log(userProfile);
    }
  },
};
