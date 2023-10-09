const { SlashCommandBuilder } = require("discord.js");
const { peopleEmbed } = require("../../embeds/people");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pick")
    .setDescription("Pick a user in your voice channel"),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply("You should be in a voice channel");
    }

    const randomMember =
      voiceChannel.members[
        Math.floor(Math.random() * voiceChannel.members.length)
      ];

    await interaction.reply({
      embeds: [peopleEmbed(randomMember)],
    });
  },
};
