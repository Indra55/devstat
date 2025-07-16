# 📊 devstat: Your Coding Profile CLI

"Know thy code. Know thyself."

`devstat` is a powerful command-line interface (CLI) tool designed to give you quick insights into your coding profiles across various platforms. Whether you're tracking your progress, comparing stats with friends, or just curious about your coding journey, `devstat` has you covered.

## ✨ Features

*   **Multi-Platform Support:** Get detailed statistics from:
    *   GitHub
    *   LeetCode
    *   Codeforces
*   **Comprehensive Profile Details:** Beyond basic info, `devstat` fetches a wealth of data including:
    *   **GitHub:** Followers, Following, Public Repos, Public Gists, Total Stars, Top Languages, Creation & Update Timestamps.
    *   **LeetCode:** Total Solved, Easy/Medium/Hard Solved counts, Acceptance Rate, Ranking, Contribution Points, Reputation.
    *   **Codeforces:** Rating, Rank, Max Rating, Max Rank, Contribution, Friends, Organization, Country, City, Email, Name, Last Online, Registration Time.
*   **Profile Comparison:** Compare any two profiles on the same platform side-by-side with clear metrics and visual bar charts.
*   **User Configuration:** `devstat` remembers your usernames, making subsequent lookups faster and more convenient.
*   **Interactive CLI:** A user-friendly interactive prompt guides you through platform selection and username input.
*   **Animated Welcome:** A cool animated banner greets you every time you launch the tool.

## 🚀 Getting Started

### Prerequisites

Make sure you have Node.js (v18 or higher recommended) installed on your system.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/devstat.git
    cd devstat
    ```
    *(Note: Replace `your-username` with your actual GitHub username if you fork this project.)*

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Usage

To start `devstat`, simply run:

```bash
node index.js
```

Follow the interactive prompts:
1.  Choose a platform (GitHub, LeetCode, Codeforces, or Compare Profiles).
2.  Enter the username(s) when prompted.

`devstat` will then fetch and display the profile information or comparison.

### GitHub Personal Access Token (Optional)

For higher GitHub API rate limits and to access private repository data (if applicable), you can set a GitHub Personal Access Token (PAT) as an environment variable named `GITHUB_TOKEN`.

1.  **Generate a PAT:** Go to [GitHub Developer Settings](https://github.com/settings/tokens) and generate a new token. Grant it the necessary permissions (e.g., `repo` for private repos, `public_repo` for public repos).
2.  **Set the environment variable:**

    **Linux/macOS:**
    ```bash
    export GITHUB_TOKEN="YOUR_PAT_HERE"
    ```
    (Add this to your `~/.bashrc`, `~/.zshrc`, or equivalent for persistence)

    **Windows (Command Prompt):**
    ```cmd
    set GITHUB_TOKEN="YOUR_PAT_HERE"
    ```

    **Windows (PowerShell):**
    ```powershell
    $env:GITHUB_TOKEN="YOUR_PAT_HERE"
    ```

    *(Replace `YOUR_PAT_HERE` with your actual GitHub Personal Access Token.)*

#### Example: Fetching a GitHub Profile

```bash
node index.js
# Select 'GitHub'
# Enter your GitHub username (e.g., 'octocat')
```

#### Example: Comparing LeetCode Profiles

```bash
node index.js
# Select 'Compare Profiles'
# Select 'LeetCode'
# Enter first LeetCode username (e.g., 'user1')
# Enter second LeetCode username (e.g., 'user2')
```

## 🧪 Running Tests

`devstat` includes unit tests to ensure the reliability of its data fetching modules.

To run the tests, use:

```bash
npm test
```

## 🤝 Contributing

Contributions are welcome! If you have ideas for new features, bug fixes, or improvements, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
