const User = require("../../schemas/user");
const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");
const mongoose = require("mongoose");
module.exports = {
  name: "steal",
  usage: `/steal <user>`,
  category: `Currency`,
  lvlboolean: true,
  ownerOnly: true,
  description: "Feeling menacing? Go ahead and steal from a member!",
  type: ApplicationCommandType.ChatInput,
  cooldown: 600000,
  options: [
    {
      name: "user",
      description: "Who you stealin from?",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const user = interaction.options.get("user").user;
    let userProfile = await User.findOne({ userId: interaction.user.id });
    let memberProfile = await User.findOne({ userId: user.id });

    // if (1 === 1) {
    //   return interaction.reply({ content: `${amount}` });
    // }

    if (user.bot) {
      return interaction.reply({
        content: `Bot's dont't got profiles`,
        ephemeral: true,
      });
    }

    if (!userProfile) {
      return interaction.reply({
        content: `How are you going to s without having a single cent in your bank.\nCreate a profile using \`/start\`!`,
        ephemeral: true,
      });
    } else if (!memberProfile) {
      return interaction.reply({
        content: `This member hasn't created a account!\nCreate a profile using \`/start\`!`,
      });
    }

    if (`${user.id}` === `${interaction.user.id}` && userProfile.stupid === 0) {
      await User.updateOne(
        { userId: `${interaction.user.id}` },
        { $set: { stupid: userProfile.stupid + 1 } }
      );
      return interaction.reply({
        content: `Don't do stupid shit again or i'll take some money from your wallet`,
      });
    } else if (user.id === interaction.user.id && userProfile.stupid === 1) {
      const divide = Math.floor(Math.random() * 9) + 1;
      const amount = userProfile.wallet / divide
      var newAmount = Math.round(amount);
      await User.updateOne(
        { userId: `${interaction.user.id}` },
        { $set: { stupid: 0, wallet: newAmount} }
      );
      const embed = new EmbedBuilder()
      .setDescription(
        `Congrats dumbass, you got caught being a stupid fuck and lost **§ ${newAmount.toLocaleString()}** coins from that!`
      )
      .setColor(`Green`);
    return interaction.reply({content: `Let that be a lesson lmao`, embeds: [embed] });
    }

    if (memberProfile.wallet < 1000) {
      return interaction.reply({
        content: `This mf is real poor, rob someone else (min wallet bal is 1000)`,
        ephemeral: true,
      });
    }
    let PercentWon = Math.floor(Math.random() * 100) + 20;
    let acutalWonamount = Math.floor((PercentWon / 100) * newAmount);
    var newAmount = acutalWonamount;

    var stealerWalletWon = userProfile.wallet + newAmount;
    var stealerWalletfailed = userProfile.wallet - newAmount;
    var robbedWallet = memberProfile.wallet - newAmount;

    var chances = ["yes", "no", "no", "yes", "no", "no"];
    var shuffleChances = chances.sort((a, b) => 0.5 - Math.random());
    var shuffledChances = shuffleChances[0];
    if (shuffledChances === "no") {
      var death = ["no", "no", "no", "no", "no", "no", "no", "no", "yes"];
      var shuffleDeads = death.sort((a, b) => 0.5 - Math.random());
      var shuffledDeaths = shuffleDeads[0];
      if (shuffledDeaths === "yes") {
        await User.updateOne(
          { userId: `${interaction.user.id}` },
          { $set: { wallet: 0, bank: 0 } }
        );
        return interaction.reply({
          content: `You **Died**! (When dying you **LOSE** everything)\nYou got **caught** and you tried **running away** but got **hit** by a bus.\nSorry not sorry`,
        });
      } else {
        await User.updateOne(
          { userId: `${interaction.user.id}` },
          { $set: { wallet: stealerWalletfailed } }
        );
        if (userProfile.wallet < 0) {
          await User.updateOne(
            { userId: `${interaction.user.id}` },
            { $set: { wallet: 0 } }
          );
        }
        const embed = new EmbedBuilder()
          .setDescription(
            `Unsuccesful pickpocket, you got caught and lost **§ ${newAmount.toLocaleString()}** coins from that!`
          )
          .setColor(`Red`);
        return interaction.reply({content: `Failed to rob ${user}!`, embeds: [embed] });
      }
    } else if (shuffledChances === "yes") {
      await User.updateOne(
        { userId: `${interaction.user.id}` },
        { $set: { wallet: stealerWalletWon } }
      );
      await User.updateOne(
        { userId: `${user.id}` },
        { $set: { wallet: robbedWallet } }
      );
      const embed = new EmbedBuilder()
        .setDescription(
          `Succesful pickpocket, you didn't get caught and gained **§ ${newAmount.toLocaleString()}** coins from that!`
        )
        .setFooter({text: `Percentage: ${PercentWon}%`})
        .setTimestamp()
        .setColor(`Green`);
      return interaction.reply({content: `${user} has been succesfully robbed!`, embeds: [embed] });
    } else {
      return interaction.reply({ content: `Error 404` });
    }

    // await User.updateOne(
    //   { userId: `${interaction.user.id}` },
    //   { $set: { wallet: newWallet, bank: newBank } }
    // );
  },
};
