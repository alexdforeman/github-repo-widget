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

    document.write("<div id=\"github-sidebar\">");
    document.write("<div id=\"github-sidebar-top\">" +
                   "<h2>Repositories<em> (" + gitHubSize + ")</em></h2></div>");
    document.write("<ul id=\"github_list\">");

    for (var i = 0; i < repos.length; i++) {
        var repoName = repos[i]['name'];

        document.write("<li id=\"github_public\">");
        document.write("<a id=\"github_link\" ");
        document.write("href=\"https://github.com/" + OWNER + "/" + repoName + "\" >");
        document.write("<span id=\"github_public_repo\"></span>");
        document.write("<span id=\"github_owner\" title=\"" + OWNER + "\" >" + OWNER + "</span>/");
        document.write("<span id=\"github_repo_name\" title=\"" + repoName + "\" >" + repoName + "</span>");
        document.write("</a>");
        document.write("</li>");
    }
    document.write("</ul>");
    document.write("</div>");
}
