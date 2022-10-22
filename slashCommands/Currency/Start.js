const User = require("../../schemas/user");
const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");
const mongoose = require("mongoose");
module.exports = {
  name: "start",
  usage: `/start <@user>`,
  category: `Currency`,
  ownerOnly: true,
  description: "Create a profile!",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  run: async (client, interaction) => {
    const member = interaction.user;
    let userProfile = await User.findOne({ userId: member.id });

    if (userProfile) {
      return interaction.reply({content: `You already have a profile!`})
    }

    if (!userProfile) {
      userProfile = await new User({
        _id: mongoose.Types.ObjectId(),
        userId: member.id,
        bank: 0,
        wallet: 0,
      });
      await userProfile.save().catch(console.error);
      const msg = new EmbedBuilder()
      .setTitle(`Welcome to § Currency System!`)
      .setDescription(
        `I have created you a balance! Welcome to § Currency!\nCheck out all of our commands in \`/help <category | currency>\`\n**Your Current Balance**:\nWallet: § **${
          userProfile.wallet
        }** Coins\nBank: § **${userProfile.bank}** Coins\nNet: § **${
          userProfile.wallet + userProfile.bank
        }** Coins`
      )
      .setTimestamp()
      .setColor(`Red`)
      .setThumbnail(member.displayAvatarURL({ dynamic: true }));
    await interaction.reply({
      embeds: [msg],
      ephemeral: true,
    });
      await interaction.reply({
        embeds: [msg],
        ephemeral: true,
      });
      console.log(userProfile);
    }
  },
};
