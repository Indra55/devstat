import axios from 'axios';

async function fetchLeetCodeProfile(username) {
  try {
    const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
    const profile = response.data;
    return {
      status: profile.status,
      message: profile.message,
      totalSolved: profile.totalSolved,
      easySolved: profile.easySolved,
      mediumSolved: profile.mediumSolved,
      hardSolved: profile.hardSolved,
      totalQuestions: profile.totalQuestions,
      acceptanceRate: profile.acceptanceRate,
      ranking: profile.ranking,
      contributionPoints: profile.contributionPoints,
      reputation: profile.reputation,
    };
  } catch (error) {
    console.error('Error fetching LeetCode profile:', error.message);
    return null;
  }
}

export { fetchLeetCodeProfile };