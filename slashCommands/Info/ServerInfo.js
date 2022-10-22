const {
  EmbedBuilder,
  ApplicationCommandType,
  ApplicationCommandOptionType,
  ActionRowBuilder,
  ButtonBuilder,
} = require("discord.js");
const moment = require("moment");
module.exports = {
  name: "serverinfo",
  usage: `/serverinfo`,
  category: `Info`,
  description: "Check the guild's info.",
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000,
  run: async (client, interaction) => {
    const dateCreated = moment(interaction.guild.createdAt);
    var serverVerified = interaction.guild.serverVerified;

    if (serverVerified === false) {
      serverVerified = "False";
    } else {
      serverVerified = "True";
    }

    var nsfwLevel = interaction.guild.nsfwLevel;
    var verificationLvl = interaction.guild.verificationLevel;
    var serverTier = interaction.guild.premiumTier;
    var explicitContentFilter = interaction.guild.explicitContentFilter;

    if (explicitContentFilter === 0) {
      explicitContentFilter = "Disabled";
    } else if (explicitContentFilter === 1) {
      explicitContentFilter = "Members without Roles";
    } else if (explicitContentFilter === 2) {
      explicitContentFilter = "All Members";
    }

    if (nsfwLevel === 0) {
      nsfwLevel = "Default";
    } else if (nsfwLevel === 1) {
      nsfwLevel = "Explict";
    } else if (nsfwLevel === 2) {
      nsfwLevel = "Safe";
    } else if (nsfwLevel === 3) {
      nsfwLevel = "Age Restricted";
    }

    if (verificationLvl === 0) {
      verificationLvl = "None";
    } else if (verificationLvl === 1) {
      verificationLvl = "Low";
    } else if (verificationLvl === 2) {
      verificationLvl = "Medium";
    } else if (verificationLvl === 3) {
      verificationLvl = "High";
    } else {
      verificationLvl = "Very High";
    }

    if (serverTier === 0) {
      serverTier = "No Tier";
    } else if (serverTier === 1) {
      serverTier = "Tier 1 (2 Boosts)";
    } else if (serverTier === 2) {
      serverTier = "Tier 2 (7 Boosts)";
    } else if (serverTier === 3) {
      serverTier = "Tier 3 (14 Boosts)";
    }

    // switch (nsfwLevel) {
    // 	case "0":
    // 	 nsfwLevel = "NSFW ALLOWED"

    // 	case "1":
    // 	nsfwLevel = "Scans Members without roles only"

    // 	case "2":
    // 		nsfwLevel = "Scans all content from members"

    // }

	const systemChannelFlag = interaction.guild.systemChannelFlags.toArray()



    const embed = new EmbedBuilder()
      .setTitle(`${interaction.guild.name}`)
      .setDescription(
        `**ID**: ${interaction.guild.id}\n**Owner**: <@${
          interaction.guild.ownerId
        }>\n**Created Date**: ${dateCreated.format("LLLL")}`
      )
      .addFields(
        {
          name: `Guild`,
          value: `**Server Tier**: ${serverTier}\n**Explict Filter**: ${explicitContentFilter}\n**NsfwLevel**: ${nsfwLevel}\n**Verification Level**: ${verificationLvl}\n**Verified**: ${serverVerified}`,
        },
        {
          name: `Members`,
          value: `**Owner**: ${interaction.guild.ownerId}\n**Member Count**: ${interaction.guild.memberCount}`,
        },
        {
          name: `Roles`,
          value: `**Highest Role**: ${interaction.guild.roles.highest}\n**Role Count**: ${interaction.guild.roles.cache.size}`,
        },
        {
          name: `Channels`,
          value: `**Channel Count**: ${interaction.guild.channels.cache.size}\n**System Channel**: ${interaction.guild.systemChannel}`,
        }
      )
      .setColor(`White`)
      .setTimestamp()
      .setThumbnail(interaction.guild.iconURL());
    interaction.reply({ embeds: [embed] });
  },
};
