# 📊 devstat: The Ultimate Coding Profile CLI

> "Know thy code. Know thyself."

---

**devstat** is a modern, interactive command-line tool that gives you instant, beautiful insights into your coding profiles across GitHub, LeetCode, and Codeforces. Whether you’re tracking your progress, comparing with friends, or just curious about your coding journey, devstat is your all-in-one terminal dashboard.

---

## ✨ Features

- **Multi-Platform Support:**
  - **GitHub**: Followers, Following, Public Repos, Gists, Total Stars, Top Languages, Timestamps, and more
  - **LeetCode**: Total Solved, Difficulty Breakdown, Acceptance Rate, Ranking, Contribution Points, Reputation
  - **Codeforces**: Rating, Rank, Max Rating, Contribution, Friends, Organization, Location, and more
- **Profile Comparison:**
  - Compare any two users on the same platform with side-by-side stats and visual bar charts
- **Interactive CLI:**
  - Guided prompts for platform and username selection
  - Animated welcome banner and progress spinners
- **User Configuration:**
  - Remembers your usernames for faster lookups
  - Stores config in your working directory (`config.json`)
- **API Token Support:**
  - Use a GitHub Personal Access Token for higher API rate limits
- **Cross-Platform:**
  - Works on Windows, macOS, and Linux
- **Open Source & Extensible:**
  - Easy to contribute and extend for new platforms

---

## 🎬 Demo

A quick video demo is included in [`media/devstat-demo.mp4`](media/devstat-demo.mp4). Open it in your favorite video player to see devstat in action!

---

## 🚀 Installation

### 1. Install via npm (Global)

```bash
npm install -g devstat
```

### 2. Run Instantly with npx (No Install)

```bash
npx devstat
```

### 3. Local Development Install

```bash
git clone https://github.com/your-username/devstat.git
cd devstat
npm install
```

---

## 🖥️ Usage

### Run the CLI

- **Globally installed:**
  ```bash
  devstat
  ```
- **With npx:**
  ```bash
  npx devstat
  ```
- **From local clone:**
  ```bash
  node index.js
  ```

### Interactive Flow

1. **Choose a platform:** GitHub, LeetCode, Codeforces, or Compare Profiles
2. **Enter username(s):** Prompts will remember your last used names
3. **View results:** Beautiful, detailed stats and comparisons

#### Example: Fetch a GitHub Profile
```bash
devstat
# Select 'GitHub'
# Enter your GitHub username (e.g., 'octocat')
```

#### Example: Compare Two LeetCode Users
```bash
devstat
# Select 'Compare Profiles' > 'LeetCode'
# Enter first username (e.g., 'user1')
# Enter second username (e.g., 'user2')
```

---

## ⚙️ Configuration & Tokens

- **Usernames** are saved in `config.json` in your current working directory for convenience.
- **GitHub API Token (Optional):**
  - For higher rate limits or private repo data, set a `GITHUB_TOKEN` environment variable.
  - [Generate a token here](https://github.com/settings/tokens) (public_repo scope is enough for public data).

#### Set the Token:
- **Linux/macOS:**
  ```bash
  export GITHUB_TOKEN="YOUR_TOKEN"
  ```
- **Windows (CMD):**
  ```cmd
  set GITHUB_TOKEN=YOUR_TOKEN
  ```
- **Windows (PowerShell):**
  ```powershell
  $env:GITHUB_TOKEN="YOUR_TOKEN"
  ```

---

## 📚 Supported Platforms & Data

- **GitHub:**
  - Followers, Following, Public Repos, Gists, Total Stars, Top Languages, Created/Updated, and more
- **LeetCode:**
  - Total Solved, Easy/Medium/Hard, Acceptance Rate, Ranking, Contribution Points, Reputation
- **Codeforces:**
  - Rating, Rank, Max Rating, Contribution, Friends, Organization, Country, City, Email, Name, Last Online, Registration Time

---

## 🛠️ Troubleshooting & FAQ

- **API Rate Limit Exceeded?**
  - Use a GitHub token as described above.
- **Network Issues?**
  - Check your internet connection and try again.
- **Config Not Saving?**
  - Ensure you have write permissions in your working directory.
- **LeetCode/Codeforces Data Missing?**
  - The tool relies on public APIs; if a service is down, try again later.

---

## 🧪 Running Tests

```bash
npm test
```

---

## 🤝 Contributing

1. Fork the repo
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Commit: `git commit -m 'feat: Add new feature'`
5. Push: `git push origin feature/your-feature`
6. Open a Pull Request

All contributions, bug reports, and feature requests are welcome!

---

## 📄 License

This project is licensed under the ISC License (see `package.json`).

---

## 🙏 Credits & Acknowledgements

- **Author:** Hitanshu
- **Libraries:** axios, chalk, inquirer, figlet, gradient-string, nanospinner, boxen, cli-progress, commander, terminal-kit, chalk-animation
- **APIs:** GitHub REST API, LeetCode Stats API, Codeforces API

---

## 💬 Contact & Support

- For issues, open a [GitHub Issue](https://github.com/your-username/devstat/issues)
- For questions or feedback, contact the author via GitHub

---

**Happy Coding! 🚀**
