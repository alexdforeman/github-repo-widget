var OWNER = "alexdforeman";     // Change your owner here.
var gitHubSize;
var repos = [];

// Parses the response from the script line into something usable
function parseResponse (response) {

    for (var repoID in response.data) {
        repo = response.data[repoID];

        repos.push(new Object({
           name: repo['name']
        }));
    }
    gitHubSize = repos.length;
}

// this creates the full HTML
function insertGitHubWidget () {

    document.write("<div class=\"github-sidebar\">");
    document.write("<div class=\"github-sidebar-top\">" +
                   "<h2>Repositories<em> (" + gitHubSize + ")</em></h2></div>");
    document.write("<ul class=\"github_list\">");

    for (var i = 0; i < repos.length; i++) {
        var repoName = repos[i]['name'];

        document.write("<li class=\"github_public\">");
        document.write("<a class=\"github_link\" ");
        document.write("href=\"https://github.com/" + OWNER + "/" + repoName + "\" >");
        document.write("<span class=\"github_public_repo\"></span>");
        document.write("<span class=\"github_owner\" title=\"" + OWNER + "\" >" + OWNER + "</span>/");
        document.write("<span class=\"github_repo_name\" title=\"" + repoName + "\" >" + repoName + "</span>");
        document.write("</a>");
        document.write("</li>");
    }
    document.write("</ul>");
    document.write("</div>");
}
