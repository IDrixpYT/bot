const { ActivityType, EmbedBuilder } = require('discord.js');
const client = require("..")
const config = require("../config.json")
client.on("guildBanAdd", async (client, ban) => {
	const logs = await client.channels.cache.get("1026979134448091256")

		const Embed = new EmbedBuilder()
			.setTitle(`🔨 Member Banned — ${ban.user.tag}`)
			.setDescription(`<@${ban.user.id}> was banned from the server`)
			.setColor("Red")
			.setThumbnail(
				`${ban.user.displayAvatarURL({ size: 4096, dynamic: true })}`
			)
			.setFooter({ text: `Member ID: ${ban.user.id}` })
			.setTimestamp()

		logs.send({
			embeds: [Embed],
		}).catch((err) => {
			console.log(err)
		})
})