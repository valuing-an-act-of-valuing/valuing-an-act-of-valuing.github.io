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
  indexShow(indexIndex);
  indexArc(indexIndex);
}

function indexHead(obj) {
  const indexTitle = document.createElement('title');
  const ogTitle = document.createElement('meta');
  indexTitle.textContent = obj['title'];
  ogTitle.setAttribute("property", "og:title");
  ogTitle.setAttribute("content", obj['title']);
  head.appendChild(indexTitle);
  head.appendChild(ogTitle);

  const indexDescription = document.createElement('meta');
  const ogDescription = document.createElement('meta');
  indexDescription.setAttribute("name", "description");
  indexDescription.setAttribute("content", obj['description']);
  ogDescription.setAttribute("property", "og:description");
  ogDescription.setAttribute("content", obj['description']);
  head.appendChild(indexDescription);
  head.appendChild(ogDescription);

  const indexAuthor = document.createElement( "meta" );
  indexAuthor.setAttribute("name", "author");
  indexAuthor.setAttribute("content", obj['author']);
  head.appendChild(indexAuthor);

  const indexEmail = document.createElement( "meta" );
  indexEmail.setAttribute("name", "reply-to");
  indexEmail.setAttribute("content", obj['email']);
  head.appendChild(indexEmail);

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
  ogIMG.setAttribute("content", location.origin + '/' + obj.src);
  twitterIMG.setAttribute("content", location.origin + '/' + obj.src);
  head.appendChild(ogIMG);
  head.appendChild(twitterIMG);

  const enter = document.querySelector("#enter b");
  enter.textContent = obj.title;

  const coverImage = document.querySelector('#images');
  coverImage.style.backgroundImage = 'url(' + obj.src + ')';

  const videoCover = document.querySelector( "#images video" );
  const videoImage = document.createElement( "source" );
  videoImage.setAttribute("type", "video/mp4");
  videoImage.setAttribute("src", obj.video);
  videoCover.appendChild(videoImage);
}

function indexShow(obj) {
  const valueShow = document.querySelector('#value .ja_app');
  const shows = obj['show'];

  for (let i = 0; i < shows.length; i++) {
    const showP = document.createElement('p');
    const showSpan = document.createElement('span');
    const showA = document.createElement('a');
    const showI = document.createElement('I');

    showSpan.textContent = shows[i].date;
    showA.textContent = shows[i].name;
    showA.href = shows[i].href;
    showI.textContent = shows[i].info;

    showP.appendChild(showSpan);
    showP.appendChild(showA);
    showP.appendChild(showI);

    valueShow.appendChild(showP);
  }
}

function indexArc(obj) {
  const valueArc = document.querySelector('#value');
  const archive = obj['archive'];

  for (let i = 0; i < archive.length; i++) {
    const arcDiv = document.createElement('div');
    arcDiv.setAttribute("class", "other_app");

    const arcH3 = document.createElement('h3');
    const arcU = document.createElement('u');
    const arcA = document.createElement('a');
    const arcBR = document.createElement('br');

    arcU.textContent = archive[i].date;
    arcA.href = archive[i].href;
    arcA.textContent = archive[i].name;

    arcH3.appendChild(arcU);
    arcH3.appendChild(arcBR);
    arcH3.appendChild(arcA);

    arcDiv.appendChild(arcH3);
    valueArc.appendChild(arcDiv);

    const infomation  = archive[i].info;
    for (let j = 0; j < infomation.length; j++) {
      const infoP = document.createElement('p');
      infoP.textContent = infomation[j];
      arcDiv.appendChild(infoP);
    }
  }

  const galleryDiv = document.createElement('div');
  galleryDiv.setAttribute("class", "en_app");
  const titleB = document.createElement('b');
  titleB.textContent = obj.title;
  const descriptionP = document.createElement('p');
  descriptionP.textContent = obj.description;

  galleryDiv.appendChild(titleB);
  galleryDiv.appendChild(descriptionP);
  valueArc.appendChild(galleryDiv);
}
