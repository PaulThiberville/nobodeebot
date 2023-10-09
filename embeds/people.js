exports.peopleEmbed = (people) => {
  const { id, avatar, username } = people.user;
  const avatarUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
  return {
    author: {
      name: username,
      icon_url: avatarUrl,
    },
  };
};
