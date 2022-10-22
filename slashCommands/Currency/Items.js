const User = require("../../schemas/user");
const {
  ApplicationCommandType,
  ApplicationCommandOptionType,
  EmbedBuilder,
} = require("discord.js");
const mongoose = require("mongoose");
const Schconfig = require("../../schemas/schemas.json");
module.exports = {
  name: `items`,
  description: `Buy and Sell Items from the item's list!`,
  usage: `/items <buy/list/sell>`,
  category: `Currency`,
  type: ApplicationCommandType.ChatInput,
  cooldown: 10000,
  options: [
    {
      name: `list`,
      description: `Get all the lists of items we have available!`,
      type: 1,
    },
    {
      name: `buy`,
      description: `Buy items in that item shop`,
      type: 1,
      options: [
        {
          name: `item`,
          description: `What item are you buying (there's not much)`,
          type: ApplicationCommandOptionType.String,
          choices: [
            {
              name: `Fishing Rod`,
              value: `fishrod`,
            },
            {
              name: `Hunting Rifle`,
              value: `rifle`,
            },
          ],
          required: true,
        },
        {
            name: `quanity`,
            description: `How much do you want to buy of this item?`,
            type: ApplicationCommandOptionType.Integer,
            min_value: 1,
            max_value: 10,
            required: false,
        }
      ],
    },
  ],
  run: async (client, interaction) => {
    let userProfile = await User.findOne({ userId: interaction.user.id });
    let userItems = userProfile.Items;
    let fishingrod = userProfile.Items.fishingrod;
    let rifle = userProfile.Items.rifle;
    if (interaction.options._subcommand === "list") {
      const list = new EmbedBuilder()
        .setTitle(`Shop Items`)
        .setDescription(
          `${Schconfig.fishRodEmoji} **${Schconfig.fishRod}** (${
            fishingrod.amount
          }) ─ § ${fishingrod.cost.toLocaleString()}\n${
            Schconfig.fishRodDescription
          }\n
      ${Schconfig.rifleEmoji} **${Schconfig.rifle}** (${
            rifle.amount
          }) ─ § ${rifle.cost.toLocaleString()}\n${Schconfig.rifleDescription}`
        )
        .setColor(`White`)
        .setFooter({ text: `/item <item> for more item info` });
      return interaction.reply({ embeds: [list] });
    }

    if (interaction.options._subcommand === "buy") {
        let item = interaction.options.get('item').value;
        let quanity = interaction.options.get('quanity')?.value || 1;
        let RiFletotalCost = userItems.rifle.cost * quanity
        let fishingrodCost = userItems.fishingrod.cost * quanity
        let fishingrodAmt = userItems.fishingrod.amount + quanity
        let rifleNewAmount = userItems.rifle.amount + quanity
        let emoji1 = "";
        let itemText = "";
        let newWallet = 0;
        let totalCost = 0;
        if (item === "fishrod") {
            totalCost = fishingrodCost;
            emoji1 = `${Schconfig.fishRodEmoji}`;
            itemText = "Fishing Rod";
            if (fishingrodCost > userProfile.wallet) {
                return interaction.reply({content: `Brokie get some more money`})
            }
            newWallet = userProfile.wallet - fishingrodCost;
            await User.updateOne(
                { userId: `${interaction.user.id}` },
                { $set: { wallet: newWallet, Items: {fishingrod: {amount: fishingrodAmt}} } }
              );
        } else if (item === "rifle") {
            newWallet = userProfile.wallet - RiFletotalCost;
            itemText = "Rifle"
            if (RiFletotalCost > userProfile.wallet) {
                return interaction.reply({content: `Brokie get some more money`})
            }
            totalCost = RiFletotalCost;
            emoji1 = Schconfig.rifleEmoji
            await User.updateOne(
                { userId: `${interaction.user.id}` },
                { $set: { wallet: newWallet, Items: {rifle: {amount: rifleNewAmount}} } }
              );
        } else {
            return interaction.reply({content: `Error`})
        }

        const buyEmbed = new EmbedBuilder()
        .setAuthor({name: `Successful ${itemText} purchase`, iconURL: interaction.user.displayAvatarURL({dynamic: true})})
        .setDescription(`${interaction.user.tag} bought **${quanity}x ${emoji1} ${itemText}** and paid § **${totalCost.toLocaleString()}**`)
        .setFooter({text: `Thanks for your purchase!`})
        .setColor(`White`);

        return interaction.reply({embeds: [buyEmbed]})

    }
  },
};
