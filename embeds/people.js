exports.peopleEmbed = (people) => {
  const { id, avatar, displayName } = people.user;
  console.log("user:", JSON.stringify(people.user, null, 2));
  const avatarUrl = `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`;
  return {
    author: {
      name: displayName,
      icon_url: avatarUrl,
    },
  };
};
