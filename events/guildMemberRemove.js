const { EmbedBuilder } = require("discord.js")
const client = require("..")
const config = require('../config.json')
const mongoose = require('mongoose');
const Guild = require('../schemas/guild')
client.on("guildMemberRemove", async (client, interaction) => {
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

	const Embed = new EmbedBuilder()
		.setTitle(`👋 Member Left — ${member.user.tag}`)
		.setDescription(
			`<@${member.user.id}> left or was kicked/banned from the server`
		)
		.setColor("Red")
		.setThumbnail(
			`${member.displayAvatarURL({ size: 4096, dynamic: true })}`
		)
		.setFooter({ text: `Member ID: ${member.id}` })
		.setTimestamp()

	logs.send({
		embeds: [Embed],
	}).catch((err) => {
		console.log(err)
	})
})