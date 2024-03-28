const { SlashCommandBuilder } = require("discord.js");
const { peopleEmbed } = require("../../embeds/people");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Rank users in your voice channel")
    .addRoleOption((option) => {
      return option
        .setName("role")
        .setDescription("Role to filter")
        .setAutocomplete(true)
        .setRequired(false);
    }),
  async execute(interaction) {
    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply("You should be in a voice channel");
    }

    const role = interaction.options.getRole("role");

    let shuffledMembers = voiceChannel.members.sort(
      (a, b) => 0.5 - Math.random()
    );

    if (role) {
      const roleMembers = shuffledMembers.filter((member) =>
        member.roles.cache.has(role.id)
      );
      shuffledMembers = roleMembers;
    }

    const embeds = shuffledMembers.map((people) => {
      return peopleEmbed(people);
    });

    await interaction.reply({
      embeds,
    });
  },
};
