const {
  EmbedBuilder,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  ActionRowBuilder,
  ButtonBuilder,
} = require("discord.js");

module.exports = {
  name: "kick",
  category: `Moderation`,
  description: "Kicks mentioned user.",
  usage: "/kick <@user> <reason>",
  cooldown: 3000,
  type: ApplicationCommandType.ChatInput,
  userPerms: "KickMembers",
  botPerms: ["KickMembers"],
  options: [
    {
        name: "user",
        description: "The user you want to kick",
        type: ApplicationCommandOptionType.User,
        required: true,
    }, 
    {
        name: "reason",
        description: "The reason why the user is being kicked.",
        type: ApplicationCommandOptionType.String,
    }
  ],
  run: async (client, interaction) => {
    const member = interaction.options.get('user')?.user
    const user = interaction.guild.members.cache.get(interaction.options.get('user').value);
    var reason = interaction.options.get("reason")?.value || "No reason provided.";

    if (!user) {
      return interaction.reply({content: `I couldn't find this user!`, ephemeral: true})
    }

    if (user.id === client.user.id) {
      return interaction.reply({content: `I can't kick myself, do it for me please.`, ephemeral: true})
    }

    if (user.id === interaction.user.id) {
      return interaction.reply({content: `Just leave the server mate.`, ephemeral: true})
    }

    if (user.id === interaction.guild.ownerId) {
      return interaction.reply({content: `I can't kick the owner.`, ephemeral: true})
    } try {
      await user.kick({reason: `"${reason}" - ${interaction.user.tag}`})
    } catch {
      return interaction.reply({content: `I couldn't kick this user\nCheck to make sure my role is higher than his highest role. (role hierarchy)`, ephemeral: true })
    }

    const kickEmbed = new EmbedBuilder()
    .setTitle(`Kicked ${member.tag}`)
    .setDescription(`${member} has been kicked from **${interaction.guild.name}**.`)
    .addFields(
        { name: 'Moderator', value: `\`\`\`${interaction.user.tag}\`\`\`` },
        { name: "Guild", value: `\`\`\`${interaction.guild.name}\`\`\``},
        { name: 'Reason', value: `\`\`\`${reason}\`\`\`` },
    
    )   
    .setThumbnail(member.displayAvatarURL({dynamic: true}))
    .setTimestamp()
    .setFooter({text: `I wouldn't take that if that was me tho`})
    .setColor(`White`)

    interaction.reply({embeds: [kickEmbed]})


  },
};
