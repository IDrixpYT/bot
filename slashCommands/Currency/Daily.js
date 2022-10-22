const User = require("../../schemas/user");
const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");
const mongoose = require("mongoose");
module.exports = {
  name: "daily",
  lvlboolean: true,
  usage: `/daily`,
  category: `Currency`,
  description: "Each day you get free new coins to recieve!",
  type: ApplicationCommandType.ChatInput,
  cooldown: 86400000,
  run: async (client, interaction) => {
    let userProfile = await User.findOne({ userId: interaction.user.id });
    const lastUpdated = new Date(userProfile.daily.timestamp);
    let streak = 0;
    let differene = (new Date().getTime() - lastUpdated.getTime()) / 1000;
    differene /= 60 * 60;
    differene = Math.abs(Math.round(differene));
    streak = userProfile.daily.streak || streak;
    if (differene < 48) {
      streak += 1;
    } else {
      streak = 0;
    }

    let streakBonus = streak * 500
    let newWallet = (userProfile.wallet + streakBonus + 50000);
    let total = 50000 + streakBonus
    let base = newWallet - streakBonus;
    let nextDaily = 24 - differene;

    await User.updateOne(
      { userId: `${interaction.user.id}` },
      { $set: { wallet: newWallet, daily: {streak: streak, timestamp: new Date()} } }
    );

    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.username}'s Daily Coins`)
      .setDescription(`>>> \`§ ${total.toLocaleString()}\` was placed in your wallet!`)
      .addFields(
        {name: `Base`, value: `§ ${base.toLocaleString()}`, inline: true},
        {name: `Streak Bonus`, value: `§ ${streakBonus.toLocaleString()}`, inline: true},
        {name: `Next Daily`, value: `||in ${nextDaily} hours||`, inline: true},
        {name: `Streak`, value: `${streak}`, inline: true}
      )
      .setColor(`White`)
      .setTimestamp()
      .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}));

    return interaction.reply({ embeds: [embed] });
  },
};
