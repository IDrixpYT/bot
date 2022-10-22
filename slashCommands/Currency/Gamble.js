const User = require("../../schemas/user");
const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");
const mongoose = require("mongoose");
module.exports = {
  name: `gamble`,
  lvlboolean: true,
  category: "Currency",
  description: `Feeling lucky? Gamble now!`,
  usage: `/gamble <amount>`,
  type: ApplicationCommandType.ChatInput,
  cooldown: 8000,
  options: [
    {
      name: `bet`,
      description: `A integer like "123", or a relative keyword like "max", "all", and "half"`,
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    const amount = interaction.options.get("bet").value;
    const member = interaction.user;
    var newAmount = amount;
    let userProfile = await User.findOne({ userId: interaction.user.id });
    const weirdCHars = [
      "/",
      "%",
      "^",
      "#",
      "@",
      "!",
      "&",
      "*",
      "(",
      ")",
      "=",
      "+",
      "-",
      "]",
      "[",
      "{",
      "}",
      ">",
      "<",
      "?",
      "|",
      "\\",
    ];

    if (amount.toLowerCase() === "max" || amount.toLowerCase() === "all") {
      newAmount = userProfile.wallet;
      if (newAmount > 5e5) {
        newAmount = 500000;
      }
    } else if (amount.toLowerCase() === "half") {
      newAmount = userProfile.wallet / 2;
    } else {
      newAmount = amount;
    }

    if (Number.isInteger(newAmount)) {
    } else {
      return interaction.reply({
        content: `*Invaild option*!\nAvailable options: **max**, **all**, **half** and a vaild **integer**!`,
        ephemeral: true,
      });
    }
    if (newAmount < 1000) {
      return interaction.reply({
        content: `*Invaild option*!\nMinimum gamble value is **1,000**!`,
        ephemeral: true,
      });
    }
    if (newAmount > 500000) {
      return interaction.reply({
        content: `*Invaild option*!\nMax gamble value is **500,000**!`,
        ephemeral: true,
      });
    }

    const userlostandwin = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
    ];
    const botlostandwin = [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
    ];
    var useroutcome = userlostandwin.sort((a, b) => 0.5 - Math.random());
    var botoutcome = botlostandwin.sort((a, b) => 0.5 - Math.random());
    var userstatus = "";

    if (parseInt(useroutcome[0]) < parseInt(botoutcome[0])) {
      userstatus = "Lost";
    } else if (parseInt(useroutcome[0]) > parseInt(botoutcome[0])) {
      userstatus = "Won";
    } else if (parseInt(useroutcome[0]) === parseInt(botoutcome[0])) {
      userstatus = "Tie";
    }

    if (member.bot) {
      return interaction.reply({
        content: `Bot's dont't got that privilege.`,
        ephemeral: true,
      });
    }

    if (!userProfile) {
      return interaction.reply({
        content: `How are you going to gamble without having a single cent in your wallet.\nCreate a profile using \`/balance\`!`,
        ephemeral: true,
      });
    }

    if (userProfile.wallet < newAmount) {
      return interaction.reply({
        content: `Insufficient wallet balance mate`,
        // content: `${amount} and ${userProfile.wallet}`,
        ephemeral: true,
      });
    }

    // if (interaction.user.id === "837356161493631027") {
    //     const newWallet = userProfile.wallet - amount;
    //     await User.updateOne(
    //       { userId: `${interaction.user.id}` },
    //       { $set: { wallet: newWallet } }
    //     );
    //     const lostEmbed = new EmbedBuilder()
    //       .setAuthor({
    //         name: `${member.username}\'s Gambling results`,
    //         iconURL: `${member.displayAvatarURL({ dynamic: true })}`,
    //       })
    //       .addFields(
    //         {
    //           name: `${member.username}`,
    //           value: `Rolled \`${useroutcome[0]}\``,
    //           inline: true
    //         },
    //         {
    //           name: `${client.user.username}`,
    //           value: `Rolled \`${botoutcome[0]}\``,
    //           inline: true
    //         }
    //       )
    //       .setDescription(`You lost **${amount}** § Coins\n\nYou have now **${newWallet}** § Coins`)
    //       .setColor(`Red`);
    //     return interaction.reply({ embeds: [lostEmbed] });
    // }

    let streak = userProfile.streak.gamble + 1;
    let PercentWon = Math.floor(Math.random() * 100) + 20;
    let acutalWonamount = Math.floor((PercentWon / 100) * newAmount);
    let bleh = acutalWonamount / 2
    let randomBonus = Math.floor(Math.random() * bleh) + 500;
    let streakValue = streak * randomBonus;

    if (userstatus === "Lost") {
      const newWallet = userProfile.wallet - newAmount;
      await User.updateOne(
        { userId: `${interaction.user.id}` },
        { $set: { wallet: newWallet, streak: { gamble: 0 } } }
      );
      const lostEmbed = new EmbedBuilder()
        .setAuthor({
          name: `${member.username}\'s Gambling results`,
          iconURL: `${member.displayAvatarURL({ dynamic: true })}`,
        })
        .addFields(
          {
            name: `${member.username}`,
            value: `Rolled \`${useroutcome[0]}\``,
            inline: true,
          },
          {
            name: `${client.user.username}`,
            value: `Rolled \`${botoutcome[0]}\``,
            inline: true,
          }
        )
        .setDescription(
          `You lost  § **${newAmount.toLocaleString()}**\n\n**New Balance**: § ${newWallet.toLocaleString()}`
        )
        .setColor(`Red`);
      return interaction.reply({ embeds: [lostEmbed] });
    } else if (userstatus === "Won") {
      const newWallet = userProfile.wallet + acutalWonamount + streakValue;
      const won = acutalWonamount + streakValue;
      await User.updateOne(
        { userId: `${interaction.user.id}` },
        { $set: { wallet: newWallet, streak: { gamble: streak } } }
      );
      const wonEmbed = new EmbedBuilder()
        .setAuthor({
          name: `${member.username}\'s Gambling results`,
          iconURL: `${member.displayAvatarURL({ dynamic: true })}`,
        })
        .addFields(
          {
            name: `${member.username}`,
            value: `Rolled \`${useroutcome[0]}\``,
            inline: true,
          },
          {
            name: `${client.user.username}`,
            value: `Rolled \`${botoutcome[0]}\``,
            inline: true,
          }
        )
        .setDescription(
          `You won § **${won.toLocaleString()}** Coins\n\n**Percent Won**: ${PercentWon}%\n**Current Streak**: ${streak} Streak(s)\n**New Balance**: § ${newWallet.toLocaleString()} Coins`
        )
        .setFooter({ text: `§ + ${streakValue.toLocaleString()} Streak Bonus` })
        .setColor(`Green`);
      return interaction.reply({ embeds: [wonEmbed] });
    } else {
      const tiedembed = new EmbedBuilder()
        .setAuthor({
          name: `${member.username}\'s Gambling results`,
          iconURL: `${member.displayAvatarURL({ dynamic: true })}`,
        })
        .addFields(
          {
            name: `${member.username}`,
            value: `Rolled \`${useroutcome[0]}\``,
            inline: true,
          },
          {
            name: `${client.user.username}`,
            value: `Rolled \`${botoutcome[0]}\``,
            inline: true,
          }
        )
        .setDescription(
          `Tie! You lost nothing!\n\nYou have § **${userProfile.wallet.toLocaleString()}**.`
        )
        .setColor(`Yellow`);
      return interaction.reply({ embeds: [tiedembed] });
    }
  },
};
