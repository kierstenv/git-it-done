const getUserRepos = (user) => {
  const apiUrl = "https://api.github.com/users/" + user + "/repos";

  fetch(apiUrl).then((response) => {
    response.json().then((data) => {
      console.log(data);
    });
  });
};

getUserRepos("facebook");

const response = fetch("https://api.github.com/users/octocat/repos");