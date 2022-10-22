const {
  EmbedBuilder,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  ActionRowBuilder,
  ButtonBuilder,
  GuildDefaultMessageNotifications,
} = require("discord.js");

module.exports = {
  name: `nickname`,
  description: `set or removes nickname from a user`,
  category: `Moderation`,
  usage: `/nickname set <nickname>`,
  cooldown: 3000,
  type: ApplicationCommandType.ChatInput,
  userPerms: "ManageNicknames",
  botPerms: "ManageNicknames",
  options: [
    {
      name: "set",
      description: "set user's name",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
            name: "user",
            description: `member to set a new nickname`,
            type: ApplicationCommandOptionType.User,
            required: true,
        },
        {
          name: "name",
          description: "The nickname you want to set to the provided member.",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
        name: "remove",
        description: "remove's a user's nickname",
        type: ApplicationCommandOptionType.Subcommand,
        options: [
            {
                name: "user",
                description: `user to remove username`,
                type: ApplicationCommandOptionType.User,
                required: true,
            }
        ]
    }
  ],
  run: async (client, interaction, role) => {

    if (interaction.options._subcommand === "set") {
        const guildUser = interaction.guild.members.cache.get(interaction.options.get('user').value);
        const guildUserI = interaction.options.get('user').user
        const nickname = interaction.options.get('name').value;
        if (!guildUserI) {
            return interaction.reply({content: `I couldn't find this user!`, ephemeral: true})
        }
        if (nickname.length > 32) {
            return interaction.reply({content: `Nickname is too long, 32 characters and below is the requirement.`, ephemeral: true})
        } try {
            await guildUser.setNickname(`${nickname}`)
            return interaction.reply({content: `I have set ${guildUserI.tag}'s nickname to **${nickname}**!`})
        } catch {
            return interaction.reply({content: `I couldn't set the nickname!\nThis could be due to role hierachy!`, ephemeral: true})
        }
    }

    if (interaction.options._subcommand === "remove") {
        const member = interaction.guild.members.cache.get(interaction.options.get('user').value);
        const memberInfo = interaction.options.get('user').user
        if (!memberInfo) {
            return interaction.reply({content: `I couldn't find this user!`, ephemeral: true})
        }  if (!member.nickname) {
          return interaction.reply({content: `${memberInfo.tag} currently doesn't have a nickname!`, ephemeral: true})
        } try {
            await member.setNickname(null)
            return interaction.reply({content: `I have reseted ${memberInfo.tag} nickname!`})
        } catch {
            return interaction.reply({content: `I couldn't reset the nickname!\nThis could be due to role hierachy!`, ephemeral: true}).then(console.error())
        }
    }

  },
};
