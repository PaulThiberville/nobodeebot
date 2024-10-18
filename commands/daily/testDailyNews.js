const { SlashCommandBuilder } = require("discord.js");
const { sendDailyNewsInChannel } = require("../../utils/dailyNews");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("test-daily-news")
    .setDescription("Permet de tester l'envoi de l'alerte quotidienne"),
  async execute(interaction) {
    try {
      const channel = interaction.channel;
      await sendDailyNewsInChannel(channel);
    } catch (error) {
      console.error(error);
      await interaction.reply(
        `Une erreur est survenue lors de l'envoi de l'alerte quotidienne`
      );
    }
  },
};
