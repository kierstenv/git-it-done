const getUserRepos = () => {
  fetch("https://api.github.com/users/octocat/repos");
};

getUserRepos();