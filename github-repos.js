const githubCards = document.querySelectorAll('#codebase .github-card[data-repo]');
const githubRefreshInterval = 15 * 60 * 1000;
let lastGithubRefresh = 0;

async function refreshGithubStats() {
  lastGithubRefresh = Date.now();

  await Promise.all(Array.from(githubCards, async (card) => {
    try {
      const repo = card.dataset.repo;
      const response = await fetch(`https://api.github.com/repos/Fluorine-Brian/${encodeURIComponent(repo)}`, {
        headers: { Accept: 'application/vnd.github+json' }
      });
      if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);

      const data = await response.json();
      card.querySelector('.star-count').textContent = data.stargazers_count.toLocaleString();
      card.querySelector('.fork-count').textContent = data.forks_count.toLocaleString();
    } catch (error) {
      // Keep the last displayed counts if GitHub is temporarily unavailable.
      console.warn(`Could not update GitHub stats for ${card.dataset.repo}:`, error);
    }
  }));
}

refreshGithubStats();
setInterval(() => {
  if (!document.hidden) refreshGithubStats();
}, githubRefreshInterval);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden && Date.now() - lastGithubRefresh >= githubRefreshInterval) {
    refreshGithubStats();
  }
});
