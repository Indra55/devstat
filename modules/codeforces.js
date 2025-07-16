import axios from 'axios';

async function fetchCodeforcesProfile(username) {
  try {
    const response = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
    const profile = response.data.result[0];
    return {
      handle: profile.handle,
      rating: profile.rating,
      rank: profile.rank,
      maxRating: profile.maxRating,
      maxRank: profile.maxRank,
      friends: profile.friendOfCount,
      contribution: profile.contribution,
      organization: profile.organization,
      country: profile.country,
      city: profile.city,
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      lastOnlineTimeSeconds: profile.lastOnlineTimeSeconds,
      registrationTimeSeconds: profile.registrationTimeSeconds,
      titlePhoto: profile.titlePhoto,
      avatar: profile.avatar,
      vkId: profile.vkId,
      openId: profile.openId,
    };
  } catch (error) {
    console.error('Error fetching Codeforces profile:', error.message);
    return null;
  }
}

export { fetchCodeforcesProfile };