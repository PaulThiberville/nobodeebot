const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("set-news-channel")
    .setDescription("Envoie les nouvelles quotidiennes dans ce canal"),
  async execute(interaction) {
    const channel = interaction.channel;
    await interaction.reply(
      `Les nouvelles seront envoyées dans ce canal : ${channel.name}`
    );
  },
};
