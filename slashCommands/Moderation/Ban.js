const {
  EmbedBuilder,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  ActionRowBuilder,
  ButtonBuilder,
} = require("discord.js");
const config = require("../../config.json")

module.exports = {
  name: "ban",
  category: `Moderation`,
  description: "Bans provided user.",
  usage: "/ban <@user> <duration> <reason>",
  cooldown: 3000,
  type: ApplicationCommandType.ChatInput,
  userPerms: "BanMembers",
  botPerms: ["BanMembers"],
  options: [
    {
      name: "user",
      description: "The user you want to ban",
      type: ApplicationCommandOptionType.User,
      required: true,
    },
    {
      name: "delete_messages",
      description:
        "How far back do you want me to delete the user's messages (0-7) days",
      type: ApplicationCommandOptionType.Integer,
      choices: [
        {
          name: "Don't Delete Any",
          value: 0,
        },
        {
          name: "Previous 24 Hours",
          value: 1,
        },
        {
          name: "Previous 2 Days",
          value: 2,
        },
        {
          name: "Previous 3 Days",
          value: 3,
        },
        {
          name: "Previous 4 Days",
          value: 4,
        },
        {
          name: "Previous 5 Days",
          value: 5,
        },
        {
          name: "Previous 6 Days",
          value: 6,
        },
        {
          name: "Previous Week",
          value: 7,
        },
      ],
    },
    {
      name: "reason",
      description: "The reason why the user is being banned.",
      type: ApplicationCommandOptionType.String,
    },
  ],
  run: async (client, interaction) => {
    const member = interaction.options.get("user")?.user;
    const user = interaction.guild.members.cache.get(
      interaction.options.get("user").value
    );
    const durationDays = interaction.options.get("delete_messages")?.value || 0;
    var reason =
      interaction.options.get("reason")?.value || "No reason provided.";

    if (!user) {
      return interaction.reply({
        content: `I couldn't find this user!`,
        ephemeral: true,
      });
    }

    if (user.id === client.user.id) {
      return interaction.reply({
        content: `I can't ban myself, do it for me please.`,
        ephemeral: true,
      });
    }

    if (user.id === interaction.guild.ownerId) {
      return interaction.reply({
        content: `You got a lovely server, why would you do that :)`,
        ephemeral: true,
      });
    }

    if (user.id === interaction.guild.ownerId) {
      return interaction.reply({
        content: `I can't ban the owner.`,
        ephemeral: true,
      });
    }

    if (user.id === interaction.user.id) {
      return interaction.reply({
        content: `Just leave the server mate.`,
        ephemeral: true,
      });
    } try {
      await user.ban({
        deleteMessageDays: durationDays,
        reason: `"${reason}" - ${interaction.user.tag}`,
      });
    } catch {
      return interaction.reply({
        content: `I couldn't ban this user\nCheck to make sure my role is higher than his highest role. (role hierarchy)`,
        ephemeral: true,
      });
    }

    const banEmbed = new EmbedBuilder()
      .setTitle(`Banned ${member.tag}`)
      .setDescription(
        `${member} has been banned from **${interaction.guild.name}**.`
      )
      .addFields(
        {
          name: "Moderator",
          value: `\`\`\`${interaction.user.tag}\`\`\``,
          inline: true,
        },
        { name: "Reason", value: `\`\`\`${reason}\`\`\``, inline: true },
        {
          name: "Delete Message Duration",
          value: `\`\`\`${durationDays} Day(s)\`\`\``,
          inline: true,
        },
        {
          name: "Guild",
          value: `\`\`\`${interaction.guild.name}\`\`\``,
          inline: true,
        }
      )
      .setThumbnail(member.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter({ text: `I wouldn't take that if that was me tho` })
      .setColor(`White`);


    interaction.reply({ embeds: [banEmbed] });

    if (config.channelLogs) {
      const logs = await client.channels.cache.get(config.channelLogs)

		const Embed = new EmbedBuilder()
			.setTitle(`🔨 Member Banned — ${member.tag}`)
			.setDescription(`<@${member.id}> was banned from the server\nReason: ${reason}\nModerator: ${interaction.user.tag}`)
			.setColor("Red")
			.setThumbnail(
				`${member.displayAvatarURL({ size: 4096, dynamic: true })}`
			)
			.setFooter({ text: `Member ID: ${member.id}` })
			.setTimestamp()

		logs.send({
			embeds: [Embed],
		})
    }
  },
};
