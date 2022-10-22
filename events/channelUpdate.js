const { ActivityType, EmbedBuilder } = require('discord.js');
const client = require("..")
const config = require("../config.json")
const mongoose = require('mongoose');
const Guild = require('../schemas/guild')
client.on("channelUpdate", async (client, guild, oldChannel, newChannel) => {
	let guildProfile = await Guild.findOne({guildId: guild.id});
	if (!guildProfile) {
	  return console.log("Working");
	}
	if (guildProfile.guildChannelLogs === "") {
	  return console.log("Working");
	}
	const logs = await client.channels.cache.get(
	  `${guildProfile.guildChannelLogs}`
	)

		if (interaction.oldChannel.name !== interaction.newChannel.name) {
			const nameEmbed = new EmbedBuilder()
				.setTitle("✏️ Channel Update")
				.addFields({
					name: "Channel Name Changed",
					value: `**#${interaction.oldChannel.name}** -> **#${interaction.newChannel.name}**`,
				})
				.setColor(`Blue`)
				.setTimestamp()

			return logs
				.send({
					embeds: [nameEmbed],
				})
				.catch((err) => {
					console.log(err)
				})
		} else if (oldChannel.topic !== newChannel.topic) {
			if (!oldChannel.topic) {
				const topicEmbed = new EmbedBuilder()
					.setTitle("✏️ Channel Update")
					.addFields({
						name: "Channel Topic Added",
						value: `<#${newChannel.id}>:\n**${newChannel.topic}**`,
					})
					.setColor(`Blue`)
					.setTimestamp()

				return logs
					.send({
						embeds: [topicEmbed],
					})
					.catch((err) => {
						console.log(err)
					})
			} else if (!newChannel.topic) {
				const topicEmbed = new EmbedBuilder()
					.setTitle("✏️ Channel Update")
					.addFields({
						name: "Channel Topic Removed",
						value: `<#${newChannel.id}>:\n**${oldChannel.topic}**\n->\n(none)`,
					})
					.setColor(`Blue`)
					.setTimestamp()

				return logs
					.send({
						embeds: [topicEmbed],
					})
					.catch((err) => {
						console.log(err)
					})
			} else {
				const topicEmbed = new EmbedBuilder()
					.setTitle("✏️ Channel Update")
					.addFields({
						name: "Channel Topic Changed",
						value: `<#${newChannel.id}>:\n**${oldChannel.topic}**\n->\n**${newChannel.topic}**`,
					})
					.setColor(`Blue`)
					.setTimestamp()

				return logs
					.send({
						embeds: [topicEmbed],
					})
					.catch((err) => {
						console.log(err)
					})
			}
		} else if (oldChannel.nsfw !== newChannel.nsfw) {
			const nsfwEmbed = new EmbedBuilder()
				.setTitle("✏️ Channel Update")
				.addFields({
					name: "Channel NSFW Changed",
					value: `<#${newChannel.id}>: **${oldChannel.nsfw}** -> **${newChannel.nsfw}**`,
				})
				.setColor(`Blue`)
				.setTimestamp()

			return logs
				.send({
					embeds: [nsfwEmbed],
				})
				.catch((err) => {
					console.log(err)
				})
		}
})