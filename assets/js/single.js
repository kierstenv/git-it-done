const repoNameEl = document.querySelector("#repo-name");
const issueContainerEl = document.querySelector("#issues-container");
const limitWarningEl = document.querySelector("#limit-warning");

const getRepoName = () => {
  const queryString = document.location.search;
  const repoName = queryString.split("=")[1];

  if (repoName) {
    repoNameEl.textContent = repoName;
    
    getRepoIssues(repoName);
  } else {
    document.location.replace("./index.html");
  }
};

const getRepoIssues = (repo) => {
  const apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
  
  fetch(apiUrl).then((response) => {
    if (response.ok) {
      response.json().then((data) => {
        displayIssues(data);

        if (response.headers.get("Link")) {
          displayWarning(repo);
        }
      });
    } else {
      document.location.replace("./index.html");
    }
  });
};

const displayIssues = (issues) => {
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues!";
    return;
  }

  issues.forEach(issue => {
    const issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issue.html_url);
    issueEl.setAttribute("target", "_blank");

    const titleEl = document.createElement("span");
    titleEl.textContent = issue.title;

    issueEl.appendChild(titleEl);

    const typeEl = document.createElement("i");

    if (issue.pull_request) {
      typeEl.textContent = "(Pull Request)";
    } else {
      typeEl.textContent = "(Issue)";
    }

    issueEl.appendChild(typeEl);

    issueContainerEl.appendChild(issueEl);
  });
};

const displayWarning = (repo) => {
  limitWarningEl.textContent = "Want to see the full list? ";

  const linkEl = document.createElement("a");
  linkEl.textContent = "View More Issues on GitHub.com"
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "_blank");

  limitWarningEl.appendChild(linkEl);
};

getRepoName();