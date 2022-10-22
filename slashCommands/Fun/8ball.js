const {
  ApplicationCommandType,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ApplicationCommandOptionType,
  Embed,
} = require("discord.js");

module.exports = {
  name: "8ball",
  category: `Fun`,
  usage: `/8ball`,
  description: "Ask the magic 8ball a question!",
  cooldown: 5000,
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "question",
      description: "Ask the 8ball a question!",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  run: async (client, interaction) => {
    var question = interaction.options.get("question").value;
    var answer = [
      "No",
      "Yes",
      "Maybe",
      "Fuck off dickhead",
      "I really don't care",
      "I don't know",
      "Damn but who?",
      "Damn but when?",
      "Damn but where?",
      "Stfu pussy",
      "that would be a hell no",
      "you're crazy"
    ];
    var botoutcome = answer.sort((a, b) => 0.5 - Math.random());
    var rpsReponse = botoutcome[0];

    const embed = new EmbedBuilder()
    .setDescription(`🎱 ${rpsReponse.toLowerCase()}`)
    .setColor(`#36393F`)

    interaction.reply({
      content: `>>> ${question}`,
      embeds: [embed]
    });
  },
};
