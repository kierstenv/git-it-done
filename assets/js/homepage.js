const userFormEl = document.querySelector("#user-form");
const nameInputEl = document.querySelector("#username");
const languageButtonsEl = document.querySelector("#language-buttons");
const repoContainerEl = document.querySelector("#repos-container");
const repoSearchTerm = document.querySelector("#repo-search-term");

const getUserRepos = (user) => {
  const apiUrl = "https://api.github.com/users/" + user + "/repos";

  fetch(apiUrl).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        displayRepos(data, user);
      });
    } else {
      alert("Error: GitHub User Not Found!");
    }
  })
  .catch((error) => {
    alert("Unable to connect to GitHub.");
  });
};

const formSubmitHandler = (event) => {
  event.preventDefault();
  
  const username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username!");
  }
};

const getFeaturedRepos = (language) => {
  const apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";
  
  fetch(apiUrl).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        displayRepos(data.items, language);
      });
    } else {
      alert("Error: GitHub User Not Found!");
    }
  });
};

const buttonClickHandler = (event) => {
  const language = event.target.getAttribute("data-language");
  
  if (language) {
    getFeaturedRepos(language);

    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = language;
  }
};

const displayRepos = (repos, searchTerm) => {
  repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;
  
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }

  repos.forEach(repo => {
    const repoName = repo.owner.login + "/" + repo.name;
    
    const repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
    
    const titleEl = document.createElement("span");
    titleEl.textContent = repoName;
    
    repoEl.appendChild(titleEl);
    
    const statusEl = document.createElement("i");
    statusEl.classList = "flex-row align-center";
    
    if (repo.open_issues_count > 1) {
      statusEl.innerHTML =
      repo.open_issues_count + " issues" + "<i class='fas fa-times status-icon icon-danger'></i>";
    } else if (repo.open_issues_count > 0) {
      statusEl.innerHTML =
      repo.open_issues_count + " issue" + "<i class='fas fa-times status-icon icon-danger'></i>";
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>"
    }
    
    repoEl.appendChild(statusEl);
    
    repoContainerEl.appendChild(repoEl);
  });
};

userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler)