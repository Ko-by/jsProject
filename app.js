const container = document.getElementById('root');
const ajax = new XMLHttpRequest();
const content = document.createElement('div');
const newsURL = 'http://api.hnpwa.com/v0/news/1.json';
const contentURL = 'https://api.hnpwa.com/v0/item/@id.json';

ajax.open('GET', newsURL, false);
ajax.send();

const newsFeed = JSON.parse(ajax.response);
const ul = document.createElement('ul');

window.addEventListener('hashchange', function () {
    console.log(location.hash);
    const id = location.hash.substr(1);
    console.log(id);

    ajax.open('GET', contentURL.replace('@id', id), false);
    ajax.send();

    const newsContent = JSON.parse(ajax.response);
    const title = document.createElement('h1');

    title.innerHTML = newsContent.title;
    content.appendChild(title);
    console.log(newsContent);
});

for(let i = 0; i < 10; i++) {
    const div = document.createElement('div');
    const li = document.createElement('li');
    const a = document.createElement('a');

    div.innerHTML = `
                    <li>
                        <a href="#${newsFeed[i].id}">
                            ${newsFeed[i].title} (${newsFeed[i].comments_count})
                        </a>
                    </li>
                    `;

    // ul.appendChild(div.children[0]);
    ul.appendChild(div.firstElementChild);
}

container.appendChild(ul);
container.appendChild(content);
