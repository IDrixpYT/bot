const { ActivityType, EmbedBuilder } = require('discord.js');
const client = require("..")
const config = require("../config.json")
client.on("channelDelete", async (channel, oldChannel, newChannel) => {
	const logs = await client.channels.cache.get(config.channelLogs)

		const Embed = new EmbedBuilder()
			.setTitle("👋 Channel Deleted")
			.setDescription(`Name: **#${channel.name}**\nID: ${channel.id}\nCategory: ${channel.parent.name}`)
			.setColor(`Red`)
			.setThumbnail(config.dripHubicon)
			.setTimestamp()

		logs.send({
			embeds: [Embed],
		}).catch((err) => {
			console.log(err)
		})
})