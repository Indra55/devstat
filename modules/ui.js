import chalk from 'chalk';
import gradient from 'gradient-string';
import boxen from 'boxen';
import chalkAnimation from 'chalk-animation';

const githubGradient = gradient(['#6e5494', '#4078c0']);
const leetcodeGradient = gradient(['#ffa116', '#be4b00']);
const codeforcesGradient = gradient(['#1f8acd', '#0056b3']);

function createGridBarChart(data, title, barColor = chalk.cyan) {
  const maxValue = Math.max(...Object.values(data));
  const maxBarHeight = 10;
  const keys = Object.keys(data);
  const values = Object.values(data);
  const scaledHeights = values.map(v => Math.round((v / maxValue) * maxBarHeight));

  const colWidth = 5;
  const grid = Array.from({ length: maxBarHeight }, () => Array(keys.length).fill(' '.repeat(colWidth)));

  for (let col = 0; col < keys.length; col++) {
    for (let row = maxBarHeight - 1; row >= maxBarHeight - scaledHeights[col]; row--) {
      grid[row][col] = barColor(' '.repeat(colWidth - 2) + '█ ');
    }
  }

  let chart = `\n${chalk.underline(title)}\n\n`;
  for (let row = 0; row < maxBarHeight; row++) {
    chart += chalk.dim('│ ') + grid[row].join('') + '\n';
  }

  chart += chalk.dim('└' + '─'.repeat(keys.length * colWidth)) + '\n';
  chart += '  ' + keys.map(k => chalk.gray(k.slice(0, 2).padStart(colWidth - 1))).join(' ') + '\n';

  return chart;
}

function createComparisonBarChart(label, val1, val2, barChar = '█', barLength = 20) {
  const maxVal = Math.max(val1, val2);
  if (maxVal === 0) return '';

  const scale1 = val1 / maxVal;
  const scale2 = val2 / maxVal;

  const bar1 = barChar.repeat(Math.round(scale1 * barLength));
  const bar2 = barChar.repeat(Math.round(scale2 * barLength));

  return `  ${label}:\n  ${chalk.blue(bar1)} ${val1}\n  ${chalk.red(bar2)} ${val2}\n`;
}

function displayGitHubProfile(profile) {
  const languageChart = createGridBarChart(profile.topLanguages, 'Top Languages', chalk.hex('#4078c0'));
  const content = `
${chalk.bold(githubGradient(`GitHub Profile: ${profile.login}`))}

${chalk.gray(`Name:         ${profile.name || 'N/A'}`)}
${chalk.gray(`Bio:          ${profile.bio || 'N/A'}`)}
${chalk.gray(`Company:      ${profile.company || 'N/A'}`)}
${chalk.gray(`Blog:         ${profile.blog || 'N/A'}`)}
${chalk.gray(`Location:     ${profile.location || 'N/A'}`)}
${chalk.gray(`Email:        ${profile.email || 'N/A'}`)}
${chalk.gray(`Twitter:      ${profile.twitter_username ? `@${profile.twitter_username}` : 'N/A'}`)}
${chalk.gray(`Followers:    ${profile.followers}      Following: ${profile.following}`)}
${chalk.gray(`Public Repos: ${profile.public_repos}      Gists: ${profile.public_gists}`)}
${chalk.gray(`Created At:   ${new Date(profile.created_at).toLocaleDateString()}`)}
${chalk.gray(`Updated At:   ${new Date(profile.updated_at).toLocaleDateString()}`)}
${languageChart}
`.trim();

  console.log(boxen(content, {
    padding: 1,
    margin: 1,
    borderStyle: 'double',
    borderColor: '#6e5494'
  }));
}

function displayLeetCodeProfile(profile, username) {
  const solvedData = {
    Easy: profile.easySolved,
    Medium: profile.mediumSolved,
    Hard: profile.hardSolved,
  };
  const solvedChart = createGridBarChart(solvedData, 'Solved Problems', chalk.hex('#be4b00'));

  const content = `
${chalk.bold(leetcodeGradient(`LeetCode Profile: ${username}`))}

${chalk.gray(`Total Solved: ${profile.totalSolved} / ${profile.totalQuestions}`)}
${chalk.gray(`Acceptance Rate: ${profile.acceptanceRate}%`)}
${chalk.gray(`Ranking: ${profile.ranking}`)}
${chalk.gray(`Contribution Points: ${profile.contributionPoints}`)}
${chalk.gray(`Reputation: ${profile.reputation}`)}
${solvedChart}
`.trim();

  console.log(boxen(content, {
    padding: 1,
    margin: 1,
    borderStyle: 'double',
    borderColor: '#ffa116'
  }));
}

function displayCodeforcesProfile(profile) {
  const content = `
${chalk.bold(codeforcesGradient(`Codeforces Profile: ${profile.handle}`))}

${chalk.gray(`Rating:       ${profile.rating || 'N/A'}   Max Rating: ${profile.maxRating || 'N/A'}`)}
${chalk.gray(`Rank:         ${profile.rank || 'N/A'}     Max Rank: ${profile.maxRank || 'N/A'}`)}
${chalk.gray(`Contribution: ${profile.contribution || 'N/A'}`)}
${chalk.gray(`Friends:      ${profile.friends || 'N/A'}`)}
${chalk.gray(`Organization: ${profile.organization || 'N/A'}`)}
${chalk.gray(`Country:      ${profile.country || 'N/A'}`)}
${chalk.gray(`City:         ${profile.city || 'N/A'}`)}
${chalk.gray(`Email:        ${profile.email || 'N/A'}`)}
${chalk.gray(`Name:         ${(profile.firstName || '') + ' ' + (profile.lastName || '')}`)}
${chalk.gray(`Last Online:  ${profile.lastOnlineTimeSeconds ? new Date(profile.lastOnlineTimeSeconds * 1000).toLocaleString() : 'N/A'}`)}
${chalk.gray(`Registered:   ${profile.registrationTimeSeconds ? new Date(profile.registrationTimeSeconds * 1000).toLocaleDateString() : 'N/A'}`)}
`.trim();

  console.log(boxen(content, {
    padding: 1,
    margin: 1,
    borderStyle: 'double',
    borderColor: '#1f8acd'
  }));
}

function displayProfileComparison(platform, profile1, profile2, username1, username2) {
  let content = `\n${chalk.bold(gradient(['#FF0000', '#0000FF'])(`${platform} Profile Comparison`))}\n\n`;

  const getComparisonLine = (label, val1, val2) => {
    let val1Str = val1 !== undefined && val1 !== null ? String(val1) : 'N/A';
    let val2Str = val2 !== undefined && val2 !== null ? String(val2) : 'N/A';

    let color1 = chalk.white;
    let color2 = chalk.white;

    if (typeof val1 === 'number' && typeof val2 === 'number') {
      if (val1 > val2) {
        color1 = chalk.green;
        color2 = chalk.red;
      } else if (val2 > val1) {
        color1 = chalk.red;
        color2 = chalk.green;
      }
    }

    return `${label.padEnd(20)} ${color1(val1Str.padEnd(15))} ${color2(val2Str.padEnd(15))}`;
  };

  content += `${'Metric'.padEnd(20)} ${chalk.bold(username1).padEnd(15)} ${chalk.bold(username2).padEnd(15)}\n`;
  content += `${'-'.repeat(55)}\n`;

  switch (platform) {
    case 'GitHub':
      content += getComparisonLine('Followers:', profile1.followers, profile2.followers) + '\n';
      content += getComparisonLine('Following:', profile1.following, profile2.following) + '\n';
      content += getComparisonLine('Public Repos:', profile1.public_repos, profile2.public_repos) + '\n';
      content += getComparisonLine('Public Gists:', profile1.public_gists, profile2.public_gists) + '\n';
      content += getComparisonLine('Total Stars:', profile1.totalStars, profile2.totalStars) + '\n';
      content += createComparisonBarChart('Followers', profile1.followers, profile2.followers);
      content += createComparisonBarChart('Public Repos', profile1.public_repos, profile2.public_repos);
      content += createComparisonBarChart('Total Stars', profile1.totalStars, profile2.totalStars);
      break;

    case 'LeetCode':
      content += getComparisonLine('Total Solved:', profile1.totalSolved, profile2.totalSolved) + '\n';
      content += getComparisonLine('Easy Solved:', profile1.easySolved, profile2.easySolved) + '\n';
      content += getComparisonLine('Medium Solved:', profile1.mediumSolved, profile2.mediumSolved) + '\n';
      content += getComparisonLine('Hard Solved:', profile1.hardSolved, profile2.hardSolved) + '\n';
      content += getComparisonLine('Acceptance Rate:', profile1.acceptanceRate, profile2.acceptanceRate) + '\n';
      content += getComparisonLine('Ranking:', profile1.ranking, profile2.ranking) + '\n';
      content += getComparisonLine('Contribution Points:', profile1.contributionPoints, profile2.contributionPoints) + '\n';
      content += getComparisonLine('Reputation:', profile1.reputation, profile2.reputation) + '\n';
      content += createComparisonBarChart('Total Solved', profile1.totalSolved, profile2.totalSolved);
      content += createComparisonBarChart('Ranking', profile2.ranking, profile1.ranking); // Lower rank is better
      break;

    case 'Codeforces':
      content += getComparisonLine('Rating:', profile1.rating, profile2.rating) + '\n';
      content += getComparisonLine('Max Rating:', profile1.maxRating, profile2.maxRating) + '\n';
      content += getComparisonLine('Rank:', profile1.rank, profile2.rank) + '\n';
      content += getComparisonLine('Max Rank:', profile1.maxRank, profile2.maxRank) + '\n';
      content += getComparisonLine('Contribution:', profile1.contribution, profile2.contribution) + '\n';
      content += getComparisonLine('Friends:', profile1.friends, profile2.friends) + '\n';
      content += createComparisonBarChart('Rating', profile1.rating, profile2.rating);
      content += createComparisonBarChart('Max Rating', profile1.maxRating, profile2.maxRating);
      break;
  }

  console.log(boxen(content, {
    padding: 1,
    margin: 1,
    borderStyle: 'double',
    borderColor: '#FFD700'
  }));
}

async function animateWelcome(text) {
  const animation = chalkAnimation.rainbow(text);
  await new Promise(resolve => setTimeout(resolve, 2000));
  animation.stop();
}

export {
  displayGitHubProfile,
  displayLeetCodeProfile,
  displayCodeforcesProfile,
  displayProfileComparison,
  animateWelcome
};
