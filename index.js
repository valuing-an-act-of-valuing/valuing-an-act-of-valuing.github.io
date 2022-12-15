async function populate() {
  const requestURL = 'index.json';
  const request = new Request(requestURL);

  const response = await fetch(request);
  const indexJson = await response.text();

  const indexIndex = JSON.parse(indexJson);
  indexHeader(indexIndex);
  indexShow(indexIndex);
  indexArc(indexIndex);
}

function indexHeader(obj) {
  const head = document.querySelector('head');
  const titleIndex = document.createElement('title');
  const enter = document.querySelector("#enter b");
  const title = document.querySelector(".title");
  const ogTitle = document.createElement('meta');
  titleIndex.textContent = obj.title;
  enter.textContent = obj.title;
  title.textContent = obj.title;
  ogTitle.setAttribute("property", "og:title");
  ogTitle.setAttribute("content", obj.title);
  head.appendChild(titleIndex);
  head.appendChild(ogTitle);

  const authorIndex = document.createElement( "meta" );
  authorIndex.setAttribute("name", "author");
  authorIndex.setAttribute("content", obj.author);
  head.appendChild(authorIndex);

  const descriptionIndex = document.createElement( "meta" );
  const ogDescription = document.createElement('meta');
  const description = document.querySelector(".description");
  descriptionIndex.setAttribute("name", "description");
  ogDescription.setAttribute("property", "og:description");
  descriptionIndex.setAttribute("content", obj.description);
  ogDescription.setAttribute("content", obj.description);
  description.textContent = obj.description;
  head.appendChild(descriptionIndex);
  head.appendChild(ogDescription);

  const ogSite = document.createElement( "meta" );
  const ogURL = document.createElement( "meta" );
  ogSite.setAttribute("property", "og:site_name");
  ogURL.setAttribute("property", "og:url");
  ogSite.setAttribute("content", obj.url);
  ogURL.setAttribute("content", obj.url);
  head.appendChild(ogSite);
  head.appendChild(ogURL);

  const ogIMG = document.createElement( "meta" );
  const twitterIMG = document.createElement( "meta" );
  const coverImage = document.querySelector('#images');
  ogIMG.setAttribute("property", "og:image");
  twitterIMG.setAttribute("name", "twitter:image");
  ogIMG.setAttribute("content", `${obj.url}${obj.image}`);
  twitterIMG.setAttribute("content", `${obj.url}${obj.image}`);
  coverImage.style.backgroundImage = `${obj.url}${obj.image}`;
  head.appendChild(ogIMG);
  head.appendChild(twitterIMG);
}

function indexShow(obj) {
  const valueShow = document.querySelector('#value .ja_app');
  const itemsShow = obj.show;

  for (const show of itemsShow) {
    const showP = document.createElement('p');
    const showSpan = document.createElement('span');
    const showBR = document.createElement('br');
    const showA = document.createElement('a');
    const showI = document.createElement('I');

    showSpan.textContent = show.date;
    showA.href = `${obj.url}${show.page}`;
    showA.textContent = show.name;
    showI.textContent = show.info;

    showP.appendChild(showSpan);
    showP.appendChild(showBR);
    showP.appendChild(showA);
    showP.appendChild(showI);

    valueShow.appendChild(showP);
  }
}

function indexArc(obj) {
  const valueArc = document.querySelector('#value .en_app');
  const itemsArc = obj.archive;

  for (const arc of itemsArc) {
    const arcP = document.createElement('p');
    const arcSpan = document.createElement('span');
    const arcA = document.createElement('a');
    const arcI = document.createElement('I');

    arcSpan.textContent = arc.date;
    arcA.href = `${obj.url}${arc.page}`;
    arcA.textContent = arc.name;
    arcI.textContent = arc.info;

    arcP.appendChild(arcSpan);
    arcP.appendChild(arcA);
    arcP.appendChild(arcI);

    valueArc.appendChild(arcP);
  }
}

populate();
