var parseResponse = (function () {
    'use strict';
    var repos = [];


    var parseResponse = (function () {
        // Parses the response from the script line into something usable
        return function (response) {
            for (var repoID in response.data) {
                var repo = response.data[repoID];

                repos.push({
                   name: repo.name,
                   description: repo.description
                });
            }
        }
    })();

    var createGitHubWidget = (function (window, document, owner, repos) {
        function element(type, content, attributes) {
            var element = document.createElement(type);
                

            if (attributes !== null && attributes !== undefined) {
                for (var attributeName in attributes) {
                    element.setAttribute(
                        attributeName,
                        attributes[attributeName]
                    );
                }
            }

            if (content !== null && content !== undefined) {
                element.appendChild(document.createTextNode(content));
            }
            
            return element
        }

        function createListItem(document, owner, repository) {
            var name = repository.name,
                repoUrl = 'https://github.com/' + owner + '/' + name;

            var li = element('li'),
                a = element('a', null, {href: repoUrl}),
                content = element('div', null, {class: 'content'}),
                owner = element('span', owner + '/', {'class': 'owner', 'title': owner}),
                repo = element('span', name, {'class': 'repo', 'title': name}),
                description = element(
                        'span',
                        repository.description,
                        {'class': 'description', title: repository.description}
                    );

            a.appendChild(owner);
            a.appendChild(repo);
            content.appendChild(a)
            content.appendChild(description)
            li.appendChild(content);
            return li;
        }

        // this creates the full HTML
        return (function (document, owner, repos, parent) {
            console.debug("Rendering");
            var sidebar = element('div', null, {'class': 'github sidebar'}),
                header = element('header', 'Repositories (' + repos.length + ')'),
                repositories = element('ul', null, {'class': 'github repositories'});

            sidebar.appendChild(header);
            sidebar.appendChild(repositories);

            repos.map(createListItem.bind(null, document, owner)).forEach(function (li) {
                repositories.appendChild(li);
            });
            parent.appendChild(sidebar);
        }).bind(null, document, owner, repos);
    })(
        window,
        document,
        'alexdforeman',
        repos
    );

    var parent = (function (selector) {
        return document.querySelector(selector);
    }).bind(null, 'aside.github');

    var waitForGitHubElementToLoad = function () {
        var p = parent();
        if ((p !== null && p !== undefined) &&
            (repos !== null && repos !== undefined)) {
            createGitHubWidget(p);
        } else {
            setTimeout(waitForGitHubElementToLoad, 1500);
        }
    }

    waitForGitHubElementToLoad();

    return parseResponse;
})()

