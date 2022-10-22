const { EmbedBuilder, ApplicationCommandType } = require("discord.js");

module.exports = {
  name: "role",
  category: `Moderation`,
  description: "Manage roles of the server or members.",
  cooldown: 3000,
  type: ApplicationCommandType.ChatInput,
  userPerms: "ManageRoles",
  botPerms: "ManageRoles", // permission required
  options: [
    {
      name: "add",
      description: "Add role to a user.",
      type: 1,
      options: [
        {
          name: "user",
          description: "The user you want to add role to.",
          type: 6,
          required: true,
        },
        {
          name: "role",
          description: "The role you want to add to the user.",
          type: 8,
          required: true,
        },
      ],
    },
    {
      name: `remove`,
      description: `Remove role from provided user.`,
      type: 1,
      options: [
        {
          name: `user`,
          description: `The user you want to remove a certain role from`,
          type: 6,
          required: true,
        },
        {
          name: `role`,
          description: "The role you want to remove from the user.",
          type: 8,
          required: true,
        },
      ],
    },
  ],
  run: async (client, interaction) => {
    if (interaction.options._subcommand === "add") {
      try {
        const member = interaction.guild.members.cache.get(
          interaction.options.get("user").value
        );
        const role = interaction.options.get("role").role;

        if(member.roles.cache.find(r => r.id === role.id)) {
            return interaction.reply({content: `This user already has that role!`})
        }        

        await member.roles.add(role.id);
        const embed = new EmbedBuilder()
          .setTitle("Role Added")
          .setDescription(`Successfully added the role: ${role} to ${member}`)
          .setColor("Green")
          .setTimestamp()
          .setThumbnail(member.user.displayAvatarURL())
          .setFooter({
            text: interaction.guild.name,
            iconURL: interaction.guild.iconURL(),
          });

        return interaction.reply({ embeds: [embed] });
      } catch {
        return interaction.reply({
          content: `Sorry, I failed adding that role!\nThis could be due to role hierachy!`,
          ephemeral: true,
        }).then(console.error);
      }
    }

    if (interaction.options._subcommand === "remove") {
    } try {
        const member = interaction.guild.members.cache.get(
            interaction.options.get("user").value
          );
          const role = interaction.options.get("role").role;
          if(!member.roles.cache.find(r => r.id === role.id)) {
            return interaction.reply({content: `This user doesn't have this role!`})
        }          
        await member.roles.remove(role.id);
          const embed = new EmbedBuilder()
            .setTitle("Role Removed")
            .setDescription(`Successfully removed the role: ${role} from ${member}`)
            .setColor("Red")
            .setTimestamp()
            .setThumbnail(member.user.displayAvatarURL())
            .setFooter({
              text: interaction.guild.name,
              iconURL: interaction.guild.iconURL(),
            });
  
          return interaction.reply({ embeds: [embed] });
    } catch {
        return interaction.reply({
          content: `Sorry, I failed removing that role!\nThis could be due to role hierachy!`,
          ephemeral: true,
        });
      }
  },
};
