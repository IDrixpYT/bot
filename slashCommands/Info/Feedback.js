const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder } = require('discord.js');

module.exports = {
	name: 'feedback',
	usage: `/feedback <service> <helper> <rating> <speed> [Recommendation] [Additional Comments]`,
	category: `Info`,
	description: "Client only commands! Send feedback of service",
	type: ApplicationCommandType.ChatInput,
	cooldown: 3000,
    options: [
        {
            name: `service`,
            description: `What service did you request?`,
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: `Discord Bot Development`,
                    value: `discordbot`
                },                {
                    name: `Video Editing`,
                    value: `videoediting`
                },                {
                    name: `Photo Editing`,
                    value: `photoediting`
                },                {
                    name: `Server Boosting`,
                    value: `serverboost`
                },
            ],
            required: true,
        }, 
        {
            name: `helper`,
            description: `Who was the one who did what you asked for?`,
            required: true,
            type: ApplicationCommandOptionType.User,
        },
        {
            name: `rating`,
            required: true,
            description: `What rating would you give it out of 10?`,
            type: ApplicationCommandOptionType.Integer,
            min_value: 1,
            max_value: 10,
        },
        {
            name: `speed`,
            description: `What rating would you give it out of 10 for speed?`,
            required: true,
            type: ApplicationCommandOptionType.Integer,
            min_value: 1,
            max_value: 10,
        },
        {
            name: `recommendation`,
            required: true,
            description: `What you recommendation this out of 10?`,
            type: ApplicationCommandOptionType.Integer,
            min_value: 1,
            max_value: 10,
        },        
        {
            name: `additonal_comments`,
            description: `Any additional comments that you would like to point out?`,
            type: ApplicationCommandOptionType.String,
            required: false,
        },
    ],
	run: async (client, interaction, role, guild) => {
        if (!interaction.member.roles.cache.has('1033142897618456687')) {
            return interaction.reply({
                content: `In order to use this command you must be a <@&1033142897618456687>!\nDon't forget that there is free things :)`,
                ephemeral: true
            })
        }
        const service = interaction.options.get('service').value;
        const helper = interaction.options.get('helper').user;
        const rating = interaction.options.get('rating').value;
        const speed = interaction.options.get('speed').value;
        const recommendation = interaction.options.get('recommendation').value;
        const additonal_comments = interaction.options.get('additonal_comments')?.value || "None provided.";
        let serviceText = "None";
        if (service === "discordbot") {
            serviceText = "Discord Bot"
        } else if (service === "photoediting") {
            serviceText = "Photo editing"
        } else if (service === "videoediting") {
            serviceText = "Video editing"
        } else if (service === "serverboost") {
            serviceText = "Server Boosts"
        }

        const adminChannel = await client.channels.cache.get(
            `1033142844120113162`
          );
        

        const embed = new EmbedBuilder()
        .setTitle(`${interaction.user.tag} - ${serviceText}`)
        .setDescription(`This is a client only command! After using a service, you could put feedback on your experience.`)
        .addFields(
            {
                name: `Helper`,
                value: `${helper}`,
                inline: false,
            },
            {
                name: `Rating`,
                value: `${rating}/10`,
                inline: false,
            },
            {
                name: `Speed`,
                value: `${speed}/10`,
                inline: false,
            },
            {
                name: `recommendation`,
                value: `${recommendation}/10`,
                inline: false,
            },            {
                name: `additonal_comments`,
                value: `${additonal_comments}`,
                inline: false,
            },
        )
        .setColor(`White`)
        .setTimestamp()
        .setThumbnail(interaction.guild.iconURL())
        .setFooter({text: `SB DripHub`, iconURL: interaction.guild.iconURL()})
        .setAuthor({text: `SB DripHub`, iconURL: interaction.guild.iconURL(), url: `https://discord.gg/CNS7GxBGmk`});

       return adminChannel.send({content: `New Submission! `, embeds: [embed], components: [verify, decline]})


	}
};