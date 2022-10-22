const {
  EmbedBuilder,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  ActionRowBuilder,
  ButtonBuilder,
} = require("discord.js");
const moment = require("moment");
module.exports = {
  name: "userinfo",
  usage: `userinfo`,
  category: `Info`,
  ownerOnly: true,
  description: "Check the user's info.",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  options: [
    {
      name: `user`,
      description: `The user you want to see information about!`,
      type: ApplicationCommandOptionType.User,
      required: false,
    },
  ],
  run: async (client, interaction) => {
    const member = interaction.options.get("user")?.user || interaction.user;
    const dateCreated = moment(member.createdAt);
    const joinAt = moment(member.joinedAt);
    const memberID = member.id;
    const membertag = member.tag;
    const memberAvatar = member.displayAvatarURL({ dynamic: true });
    const embed = new EmbedBuilder()
      .setThumbnail(memberAvatar)
      .setDescription(`${member}`)
      .setTimestamp()
      .setColor(`White`)
      .setAuthor({ name: membertag, iconURL: `${memberAvatar}` })
      .addFields(
        { name: "User ID", value: `${memberID}` },
        { name: "Created Date", value: `${dateCreated.format("LLLL")}` },
        { name: "Joined Date", value: `${joinAt.format("LLLL")}` },
        { name: "User Roles", value: `${member.guild.roles.join(", ")}` }
      );
    interaction.reply({ embeds: [embed] });
  },
};
