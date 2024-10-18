const { SlashCommandBuilder } = require("discord.js");
const { db } = require("../../firebase");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("subscribe-news")
    .setDescription("S'abonner à l'alerte quotidienne"),
  async execute(interaction) {
    try {
      const user = interaction.user;
      await db.collection("daily_news_subscribers").add({
        userId: user.id,
        date: Date.now(),
      });
      await interaction.reply(
        `<@${user.id}>, vous êtes désormais abonné à l'alerte quotidienne`
      );
    } catch (error) {
      console.error(error);
      await interaction.reply(
        `Une erreur est survenue lors de l'abonnement à l'alerte quotidienne`
      );
    }
  },
};
