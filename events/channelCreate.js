const { ActivityType, EmbedBuilder, ChannelType } = require('discord.js');
const client = require("..")
const config = require("../config.json")
const mongoose = require('mongoose')
const Guild = require("../schemas/guild");
client.on("channelCreate", async (channel, oldChannel, newChannel) => {

	const channelLogs = await Guild.findOne({})

	const logs = await client.channels.cache.get(config.channelLogs)

	let channeltype
	let channelnsfw = channel.nsfw

	if (channel.type === ChannelType.GuildCategory) {
		channeltype = "GuildCategory"
		channelnsfw = "N/A"
	} else if (channel.type === ChannelType.GuildVoice) {
		channeltype = "GuildVoice"
	} else if (channel.type === ChannelType.GuildText) {
		channeltype = "GuildText"
	}

	if (channelnsfw === false) {
		channelnsfw = "False"
	} else {
		channelnsfw = "True";
	}

	const Embed = new EmbedBuilder()
		.setTitle("🆕 Channel Created")
		.setDescription(
			`Channel Name: **#${channel.name}**\nID: **${channel.id}**\nType: **${channeltype}**\nNSFW: **${channelnsfw}**\nCategory: **${channel.parent.name}**\nCategoryPos: **${channel.position}**`
		)
		.setColor(`Green`)
		.setThumbnail(config.dripHubicon)
		.setTimestamp()

	logs.send({
		embeds: [Embed],
	}).catch((err) => {
		console.log(err)
	})
})