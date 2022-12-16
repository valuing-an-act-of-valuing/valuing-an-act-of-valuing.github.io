const head = document.querySelector('head');

let requestURL = 'index.json';
let request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'text';
request.send();

request.onload = function() {
  const indexIndexText = request.response;
  const indexIndex = JSON.parse(indexIndexText);
  indexHead(indexIndex);
}

function indexHead(obj) {
  const indexTitle = document.createElement('title');
  const ogTitle = document.createElement('meta');
  indexTitle.textContent = obj['title'] + ' | ' + obj['author'];
  ogTitle.setAttribute("property", "og:title");
  ogTitle.setAttribute("content", obj['title'] + ' | ' + obj['author']);
  head.appendChild(indexTitle);
  head.appendChild(ogTitle);

  const indexAuthor = document.createElement( "meta" );
  indexAuthor.setAttribute("name", "author");
  indexAuthor.setAttribute("content", obj['author']);
  head.appendChild(indexAuthor);

  const ogSite = document.createElement( "meta" );
  ogSite.setAttribute("property", "og:site_name");
  ogSite.setAttribute("content", location.hostname);
  head.appendChild(ogSite);

  const ogURL = document.createElement( "meta" );
  ogURL.setAttribute("property", "og:url");
  ogURL.setAttribute("content", location.href);
  head.appendChild(ogURL);

  const ogIMG = document.createElement( "meta" );
  const twitterIMG = document.createElement( "meta" );
  ogIMG.setAttribute("property", "og:image");
  twitterIMG.setAttribute("name", "twitter:image");
  ogIMG.setAttribute("content", location.protocol + '//' + location.hostname + '/' + obj['src']);
  twitterIMG.setAttribute("content", location.protocol + '//' + location.hostname + '/' + obj['src']);
  head.appendChild(ogIMG);
  head.appendChild(twitterIMG);

  const what = document.querySelector('#what b');
  what.innerText = obj.title;

  const you = document.querySelector('#you');
  you.innerText = obj.author;

  const coverImage = document.querySelector('#image');
  coverImage.style.display = obj.img;
  coverImage.style.backgroundImage = 'url(' + obj.image + ')';
}

const valueCSS = document.createElement( "link" );
valueCSS.href = "../../online/value.css";
valueCSS.type = "text/css";
valueCSS.rel = "stylesheet";

document.getElementsByTagName("head")[0].appendChild(valueCSS);
