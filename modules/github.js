import axios from 'axios';

async function fetchGitHubProfile(username) {
  try {
    const userResponse = await axios.get(`https://api.github.com/users/${username}`);
    const reposResponse = await axios.get(`https://api.github.com/users/${username}/repos`);

    const languages = reposResponse.data.reduce((acc, repo) => {
      if (repo.language) {
        acc[repo.language] = (acc[repo.language] || 0) + 1;
      }
      return acc;
    }, {});

    const topLanguages = Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .reduce((acc, [lang, count]) => {
        acc[lang] = count;
        return acc;
      }, {});

    return { 
      login: userResponse.data.login,
      id: userResponse.data.id,
      node_id: userResponse.data.node_id,
      avatar_url: userResponse.data.avatar_url,
      gravatar_id: userResponse.data.gravatar_id,
      url: userResponse.data.url,
      html_url: userResponse.data.html_url,
      followers_url: userResponse.data.followers_url,
      following_url: userResponse.data.following_url,
      gists_url: userResponse.data.gists_url,
      starred_url: userResponse.data.starred_url,
      subscriptions_url: userResponse.data.subscriptions_url,
      organizations_url: userResponse.data.organizations_url,
      repos_url: userResponse.data.repos_url,
      events_url: userResponse.data.events_url,
      received_events_url: userResponse.data.received_events_url,
      type: userResponse.data.type,
      site_admin: userResponse.data.site_admin,
      name: userResponse.data.name,
      company: userResponse.data.company,
      blog: userResponse.data.blog,
      location: userResponse.data.location,
      email: userResponse.data.email,
      hireable: userResponse.data.hireable,
      bio: userResponse.data.bio,
      twitter_username: userResponse.data.twitter_username,
      public_repos: userResponse.data.public_repos,
      public_gists: userResponse.data.public_gists,
      followers: userResponse.data.followers,
      following: userResponse.data.following,
      created_at: userResponse.data.created_at,
      updated_at: userResponse.data.updated_at,
      topLanguages, 
    };
  } catch (error) {
    console.error('Error fetching GitHub profile:', error.message);
    return null;
  }
}

export { fetchGitHubProfile };