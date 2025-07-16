#!/usr/bin/env node
import inquirer from 'inquirer';
import { createSpinner } from 'nanospinner';
import { fetchGitHubProfile } from './modules/github.js';
import { fetchLeetCodeProfile } from './modules/leetcode.js';
import { fetchCodeforcesProfile } from './modules/codeforces.js';
import {
  displayGitHubProfile,
  displayLeetCodeProfile,
  displayCodeforcesProfile,
  displayProfileComparison,
} from './modules/ui.js';
import figlet from 'figlet';
import gradient from 'gradient-string';
import chalk from 'chalk';
import sleep from './modules/sleep.js';
import { loadConfig, saveConfig } from './modules/config.js';

async function printBannerLines(text) {
  const banner = figlet.textSync(text, {
    font: 'ANSI Shadow',
    horizontalLayout: 'full',
  });
  const lines = banner.split('\n');
  for (const line of lines) {
    console.log(gradient.cristal(line));
    await sleep(60);
  }
  console.log('\n');
}

async function injectLines(platform) {
  const color = chalk.greenBright;

  switch (platform) {
    case 'GitHub':
      console.log(color('> Injecting into GitHub API...'));
      await sleep(800);
      console.log('  ↳ Fetching repositories, stars, and contribution graph...\n');
      break;
    case 'LeetCode':
      console.log(color('> Injecting into LeetCode backend...'));
      await sleep(800);
      console.log('  ↳ Grabbing problem stats, ranks, and streaks...\n');
      break;
    case 'Codeforces':
      console.log(color('> Injecting into Codeforces servers...'));
      await sleep(800);
      console.log('  ↳ Pulling contest history, rating changes, and submissions...\n');
      break;
  }
}

async function welcome() {
  console.clear();

  const spinner = createSpinner('Initializing devstat...').start();
  await sleep(1000);
  spinner.success({ text: 'Terminal injection complete.' });

  await printBannerLines('devstat');

  console.log(chalk.gray('// Know thy code. Know thyself.\n'));
}

async function main() {
  await welcome();

  let config = await loadConfig();

  while (true) {
    const { platform } = await inquirer.prompt([
      {
        type: 'list',
        name: 'platform',
        message: 'Which platform?',
        choices: ['GitHub', 'LeetCode', 'Codeforces', 'Compare Profiles', new inquirer.Separator(), 'Quit'],
      },
    ]);

    if (platform === 'Quit') {
      console.log(chalk.yellowBright('\n👋 Exiting devstat. Keep Coding!\n'));
      break;
    }

    if (platform === 'Compare Profiles') {
      const { comparePlatform } = await inquirer.prompt([
        {
          type: 'list',
          name: 'comparePlatform',
          message: 'Which platform to compare?',
          choices: ['GitHub', 'LeetCode', 'Codeforces'],
        },
      ]);

      const { username1 } = await inquirer.prompt([
        {
          type: 'input',
          name: 'username1',
          message: `Enter first ${comparePlatform} username:`,
          default: config[comparePlatform.toLowerCase()] || '',
        },
      ]);

      const { username2 } = await inquirer.prompt([
        {
          type: 'input',
          name: 'username2',
          message: `Enter second ${comparePlatform} username:`,
          default: config[comparePlatform.toLowerCase()] || '',
        },
      ]);

      
      config[comparePlatform.toLowerCase()] = username1;
      await saveConfig(config);

      await injectLines(comparePlatform);

      const spinner = createSpinner('Fetching profiles for comparison...').start();

      try {
        let profile1, profile2;
        switch (comparePlatform) {
          case 'GitHub':
            profile1 = await fetchGitHubProfile(username1);
            profile2 = await fetchGitHubProfile(username2);
            break;
          case 'LeetCode':
            profile1 = await fetchLeetCodeProfile(username1);
            profile2 = await fetchLeetCodeProfile(username2);
            break;
          case 'Codeforces':
            profile1 = await fetchCodeforcesProfile(username1);
            profile2 = await fetchCodeforcesProfile(username2);
            break;
        }

        if (profile1 && profile2) {
          displayProfileComparison(comparePlatform, profile1, profile2, username1, username2);
          spinner.success({ text: 'Profiles fetched successfully for comparison.' });
        } else {
          spinner.error({ text: 'Could not fetch one or both profiles for comparison.' });
        }
      } catch (error) {
        spinner.error({ text: 'An error occurred during comparison.' });
      }
    } else {
      const { username } = await inquirer.prompt([
        {
          type: 'input',
          name: 'username',
          message: `Enter your ${platform} username:`,
          default: config[platform.toLowerCase()] || '',
        },
      ]);

      config[platform.toLowerCase()] = username;
      await saveConfig(config);

      await injectLines(platform);

      const spinner = createSpinner('Fetching profile...').start();

      try {
        let profile;
        switch (platform) {
          case 'GitHub':
            profile = await fetchGitHubProfile(username);
            if (profile) displayGitHubProfile(profile);
            else spinner.error({ text: 'Could not fetch GitHub profile.' });
            break;

          case 'LeetCode':
            profile = await fetchLeetCodeProfile(username);
            if (profile) displayLeetCodeProfile(profile, username);
            else spinner.error({ text: 'Could not fetch LeetCode profile.' });
            break;

          case 'Codeforces':
            profile = await fetchCodeforcesProfile(username);
            if (profile) displayCodeforcesProfile(profile);
            else spinner.error({ text: 'Could not fetch Codeforces profile.' });
            break;
        }

        spinner.success({ text: 'Profile fetched successfully.' });
      } catch (error) {
        spinner.error({ text: 'An error occurred.' });
      }
    }

    console.log(); 
     console.log(); 
  }
}


main();