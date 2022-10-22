const {
  ApplicationCommandType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ApplicationCommandOptionType,
} = require("discord.js");

module.exports = {
  name: "rps",
  category: `Fun`,
  usage: `/rate <rock/paper/scissors>`,
  description: "Rps wit the bot!",
  cooldown: 5000,
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "choose",
      description: "Rock, paper, or scissors?",
      type: ApplicationCommandOptionType.String,
      required: true,
      choices: [
        {
          name: "Rock",
          value: "Rock",
        },
        {
          name: "Paper",
          value: "Paper",
        },
        {
          name: "Scissors",
          value: "Scissors",
        },
      ],
    },
  ],
  run: async (client, interaction) => {
    var option = interaction.options.get("choose").value;
    var rps = ["Rock", "Paper", "Scissors"];
    var botoutcome = rps.sort((a, b) => 0.5 - Math.random());
    var rpsBot = botoutcome[0];
    var outcome = "";

    if (rpsBot === option) {
      outcome = "Tie";
    } else if (rpsBot === "Rock" && option === "Scissors") {
      outcome = "Lost";
    } else if (rpsBot === "Scissors" && option === "Rock") {
      outcome = "Won";
    } else if (rpsBot === "Paper" && option === "Rock") {
      outcome = "Lost";
    } else if (option === "Paper" && rpsBot === "Rock") {
      outcome = "Won";
    } else if (option ==="Paper" && rpsBot === "Scissors") {
        outcome = "Lost"
    }

    var msg = "";

    if (outcome === "Won") {
        msg = "You've won!"
    } else if (outcome === "Lost") {
        msg = "Damn loser, you lost lmao"
    } else if (outcome === "Tie"){
        msg = "You got lucky, it's a tie!"
    }

    interaction.reply({content: `${msg}!\nI choose **${rpsBot}**\nYou chose **${option}**`});
  },
};
