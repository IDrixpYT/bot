const User = require("../../schemas/user");
const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");
const mongoose = require("mongoose");
module.exports = {
  name: "beg",
  lvlboolean: true,
  usage: `/beg`,
  category: `Currency`,
  description: "Completely broke? Beg for some cash",
  type: ApplicationCommandType.ChatInput,
  cooldown: 45000,
  run: async (client, interaction) => {
    let userProfile = await User.findOne({ userId: interaction.user.id });

    if (!userProfile) {
      return interaction.reply({
        content: `I get that you're broke but first create a profile!\nCreate a profile using \`/start\`!`,
        ephemeral: true,
      });
    }

    const goodMessages = [
      "out of sympathy",
      "feeling generous",
      "out of pity",
      "out of remourse",
      "out of hatred?",
      "they were generous",
      "they were meticulous",
      "they were caring",
      "yes",
    ];

    const badMessages = [
      "out of looks",
      "feeling rude",
      "they hated you",
      "they thought you were lying",
      "they thought you were a jew",
      "they were pressured",
      "they didn't care",
      "no",
    ];

    const Celebrities = [
      "Vuuxen Pendragon",
      "Johnny Depp",
      "Arnold Schwarzenegger",
      "Jim Carrey",
      "Emma Watson",
      "Robert Downey Jr.",
      "Daniel Radcliffe",
      "Chris Evans",
      "Leonardo DiCaprio",
      "Tom Cruise",
      "Brad Pitt",
      "Morgan Freeman",
      "Tom Hanks",
      "Hugh Jackman",
      "Will Smith",
      "Clint Eastwood",
      "George Clooney",
      "Mark Wahlberg",
      "Dwayne Johnson",
      "Jackie Chan",
      "Adam Sandler",
      "Scarlett Johansson",
    ];

    var enteranceMsg = "";
    var shuffleMsg = [];
    var getShuffle = [];
    var actualMsg = [];
    const luck = ["1", "2", "2"];
    var shuffleCeleb = Celebrities.sort((a, b) => 0.5 - Math.random());
    var GetCeleb = shuffleCeleb[0];
    var tenK = Math.floor(Math.random() * 9500);
    var amount = tenK + 500;
    if (amount >= 3000) {
      enteranceMsg = ["Amazing!", "Excellent!", "Brilliant!", "Spectacular!"];
      shuffleMsg = enteranceMsg.sort((a, b) => 0.5 - Math.random());
      getShuffle = shuffleMsg[0];
      actualMsg = getShuffle;
    } else if (amount < 3000) {
      enteranceMsg = ["Great news!", "Perfect", "Nice!"];
      shuffleMsg = enteranceMsg.sort((a, b) => 0.5 - Math.random());
      getShuffle = shuffleMsg[0];
      actualMsg = getShuffle;
    } else if (amount <= 1000) {
      enteranceMsg = ["Could've been better!", "We take thos"];
      shuffleMsg = enteranceMsg.sort((a, b) => 0.5 - Math.random());
      getShuffle = shuffleMsg[0];
      actualMsg = getShuffle;
    }
    var outcomeLuck = luck.sort((a, b) => 0.5 - Math.random());
    var badMessage = badMessages.sort((a, b) => 0.5 - Math.random());
    var goodMessage = goodMessages.sort((a, b) => 0.5 - Math.random());
    var getOutcomeLuck = outcomeLuck[0];
    var getBadMsg = badMessage[0];
    var getGoodMsg = goodMessage[0];
    const newGoodWallet = amount + userProfile.wallet;

    if (getOutcomeLuck === "2") {
      await User.updateOne(
        { userId: `${interaction.user.id}` },
        { $set: { wallet: newGoodWallet } }
      );
      return interaction.reply({
        content: `**${actualMsg}** **${GetCeleb}** donated **${amount.toLocaleString()}** § Coins, because **${getGoodMsg}**!`,
      });
    } else {
      return interaction.reply({
        content: `Yikes. **${GetCeleb}** rejected you, because **${getBadMsg}**.`,
      });
    }
  },
};
