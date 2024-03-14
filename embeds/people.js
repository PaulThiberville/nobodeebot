exports.peopleEmbed = (people) => {
  const { id, avatar, displayName } = people.user;
  const avatarUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
  return {
    author: {
      name: displayName,
      icon_url: avatarUrl,
    },
  };
};
