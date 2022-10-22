const {
  ApplicationCommandType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ApplicationCommandOptionType,
} = require("discord.js");

module.exports = {
  name: "rate",
  category: `Fun`,
  usage: `/rate || <user> <rating_of>`,
  description: "Rate a member",
  cooldown: 5000,
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "user",
      description: "The rating of the user you want to display.",
      type: ApplicationCommandOptionType.User,
    },
    {
      name: "rating_of",
      description: "What type of rating is this?",
      type: ApplicationCommandOptionType.String,
      choices: [
        {
          name: "Gay",
          value: "Gayness",
        },
        {
          name: "Love",
          value: "Love",
        },
        {
          name: "IQ",
          value: "IQ",
        },
      ],
    },
  ],
  run: async (client, interaction) => {
    const user = interaction.options.get("user")?.user || interaction.user;
    var ratingOption = interaction.options.get("rating_of")?.value || "Rating";

    // if ((ratingOption) === true) {
    //   return interaction.reply({ content: `This shouldn't be an integer, please provide a vaild rating of!`, ephemeral: true})
    // }

    var rating = Math.floor(Math.random() * 100);
    var ratingMsg = "";
    var ratingColor = "";

    if (rating < 50) {
      var ratingMsg = `${user.tag} HAS A HORRIBLE RATING OF ${rating}%`;
      var ratingColor = "#89a203";
    }
    if (rating >= 50) {
      var ratingMsg = `${user.tag} has a below average rating of ${rating}%`;
      var ratingColor = "#DD3A3A";
    }
    if (rating >= 60) {
      var ratingMsg = `${user.tag} has a average rating of ${rating}%`;
      var ratingColor = "Grey";
    }
    if (rating >= 70) {
      var ratingMsg = `${user.tag} has above average rating of ${rating}%`;
      var ratingColor = "Blue";
    }
    if (rating >= 80) {
      var ratingMsg = `${user.tag} has an excellent rating of ${rating}%`;
      var ratingColor = "Green";
    }
    if (rating > 90) {
      var ratingMsg = `${user.tag} HAS A OUTSTANDING RATNG OF ${rating}%`;
      var ratingColor = "Gold";
    }

    var mid = "Rating";

    // if (ratingOption === "Gayness") {
    //   mid = "Rating"
    // } else if (ratingOption === "Love") {

    // }

    if (ratingOption === "Rating") {
      mid = "Command";
    }

    const embed = new EmbedBuilder()
      .setTitle(`${ratingOption} ${mid}!`)
      .setDescription(`**${ratingMsg}**`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .setColor(ratingColor);
    return interaction.reply({ embeds: [embed] });
  },
};
