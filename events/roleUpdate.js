const { EmbedBuilder } = require("discord.js");
const client = require("..");
const config = require("../config.json");
const mongoose = require('mongoose');
const Guild = require('./../schemas/guild');
client.on("roleUpdate", async (interaction, oldRole, newRole) => {
  let guildProfile = await Guild.findOne({ guildId: interaction.guild.id });
  if (!guildProfile) {
    return;
  }
  if (guildProfile.guildChannelLogs === "") {
    return;
  }
  const logs = await client.channels.cache.get(
    `${guildProfile.guildChannelLogs}`
  );

  if (oldRole.name !== newRole.name) {
    const nameEmbed = new EmbedBuilder()
      .setTitle("✏️ Role Update")
      .addFields({
        name: `${oldRole.name} Name Changed!`,
        value: `**${oldRole.name}** -> **${newRole.name}**`,
      })
      .setColor(`Blue`)
      .setTimestamp();

    return logs
      .send({
        embeds: [nameEmbed],
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (oldRole.color != newRole.color) {
    const colorEmbed = new EmbedBuilder()
      .setTitle("✏️ Role Update")
      .addFields({
        name: `${oldRole.name} Color Changed!`,
        value: `**${oldRole.hexColor}** -> **${newRole.hexColor}**`,
      })
      .setColor(newRole.color)
      .setTimestamp();

    return logs
      .send({
        embeds: [colorEmbed],
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (oldRole.hoist != newRole.hoist) {
    var oldRoleH = oldRole.hoist;
    var newRoleH = newRole.hoist;

    if (oldRoleH === true) {
      oldRoleH = "True";
    } else {
      oldRoleH = "False";
    }

    if (newRoleH === true) {
      newRoleH = "True";
    } else {
      newRoleH = "False";
    }

    const hoistEmbed = new EmbedBuilder()
      .setTitle("✏️ Role Update")
      .addFields({
        name: `${oldRole.name} Hoist Changed!`,
        value: `**${oldRoleH}** -> **${newRoleH}**`,
      })
      .setColor(newRole.color)
      .setTimestamp();

    return logs
      .send({
        embeds: [hoistEmbed],
      })
      .catch((err) => {
        console.log(err);
      });
  }

  if (oldRole.mentionable != newRole.mentionable) {
    var oldRoleM = oldRole.mentionable;
    var newRoleM = newRole.mentionable;

    if (oldRoleM === true) {
      oldRoleM = "True" 
    } else {
		oldRoleM = "False"
	}
    if (newRoleM === true) {
      newRoleM = "True" 
    } else {
		newRoleM = "False"
	}
    const mentionableEmbed = new EmbedBuilder()
      .setTitle("✏️ Role Update")
      .addFields({
        name: `${oldRole.name} Mentionable Changed!`,
        value: `**${oldRoleM}** -> **${newRoleM}**`,
      })
      .setColor(newRole.color)
      .setTimestamp();

    return logs
      .send({
        embeds: [mentionableEmbed],
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // else if (oldChannel.topic !== newChannel.topic) {
  // 	if (!oldChannel.topic) {
  // 		const topicEmbed = new EmbedBuilder()
  // 			.setTitle("✏️ Channel Update")
  // 			.addField(
  // 				"Channel Topic Added",
  // 				`<#${newChannel.id}>:\n**${newChannel.topic}**`
  // 			)
  // 			.setColor(`Blue`)
  // 			.setTimestamp()

  // 		return logs
  // 			.send({
  // 				embeds: [topicEmbed],
  // 			})
  // 			.catch((err) => {
  // 				console.log(err)
  // 			})
  // 	} else if (!newChannel.topic) {
  // 		const topicEmbed = new EmbedBuilder()
  // 			.setTitle("✏️ Channel Update")
  // 			.addField(
  // 				"Channel Topic Removed",
  // 				`<#${newChannel.id}>:\n**${oldChannel.topic}**\n->\n(none)`
  // 			)
  // 			.setColor(`Blue`)
  // 			.setTimestamp()

  // 		return logs
  // 			.send({
  // 				embeds: [topicEmbed],
  // 			})
  // 			.catch((err) => {
  // 				console.log(err)
  // 			})
  // 	} else {
  // 		const topicEmbed = new EmbedBuilder()
  // 			.setTitle("✏️ Channel Update")
  // 			.addField(
  // 				"Channel Topic Changed",
  // 				`<#${newChannel.id}>:\n**${oldChannel.topic}**\n->\n**${newChannel.topic}**`
  // 			)
  // 			.setColor(`Blue`)
  // 			.setTimestamp()

  // 		return logs
  // 			.send({
  // 				embeds: [topicEmbed],
  // 			})
  // 			.catch((err) => {
  // 				console.log(err)
  // 			})
  // 	}
  // } else if (oldChannel.nsfw !== newChannel.nsfw) {
  // 	const nsfwEmbed = new EmbedBuilder()
  // 		.setTitle("✏️ Channel Update")
  // 		.addField(
  // 			"Channel NSFW Changed",
  // 			`<#${newChannel.id}>: **${oldChannel.nsfw}** -> **${newChannel.nsfw}**`
  // 		)
  // 		.setColor(`Blue`)
  // 		.setTimestamp()

  // 	return logs
  // 		.send({
  // 			embeds: [nsfwEmbed],
  // 		})
  // 		.catch((err) => {
  // 			console.log(err)
  // 		})
  // }
});
