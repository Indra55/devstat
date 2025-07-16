import { fetchGitHubProfile } from '../modules/github.js';

describe('fetchGitHubProfile', () => {
  test('should fetch GitHub profile for a valid username', async () => {
    const username = 'octocat';
    const profile = await fetchGitHubProfile(username);
    expect(profile).toBeDefined();
    expect(profile.login).toBe(username);
    expect(profile.public_repos).toBeGreaterThanOrEqual(0);
  });

  test('should return null for an invalid username', async () => {
    const username = 'nonexistentuser12345';
    const profile = await fetchGitHubProfile(username);
    expect(profile).toBeNull();
  });
});