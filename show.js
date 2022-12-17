async function populate() {
  const requestURL = 'index.json';
  const request = new Request(requestURL);

  const response = await fetch(request);
  const indexJson = await response.text();

  const indexIndex = JSON.parse(indexJson);
  indexHeader(indexIndex);
}

function indexHeader(obj) {
  const head = document.querySelector('head');
  const indexTitle = document.createElement('title');
  const ogTitle = document.createElement('meta');
  indexTitle.textContent = `${obj.title} | ${obj.author}`;
  ogTitle.setAttribute("property", "og:title");
  ogTitle.setAttribute("content", `${obj.title} | ${obj.author}`);
  head.appendChild(indexTitle);
  head.appendChild(ogTitle);

  const indexAuthor = document.createElement( "meta" );
  indexAuthor.setAttribute("name", "author");
  indexAuthor.setAttribute("content", obj.author);
  head.appendChild(indexAuthor);

  const indexDescription = document.createElement( "meta" );
  const ogDescription = document.createElement('meta');
  indexDescription.setAttribute("name", "description");
  ogDescription.setAttribute("property", "og:description");
  indexDescription.setAttribute("content", `${obj.date} | ${obj.info}`);
  ogDescription.setAttribute("content", `${obj.date} | ${obj.info}`);
  head.appendChild(indexDescription);
  head.appendChild(ogDescription);

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
  ogIMG.setAttribute("content", `${location.href}${obj.src}`);
  twitterIMG.setAttribute("content", `${location.href}${obj.src}`);
  head.appendChild(ogIMG);
  head.appendChild(twitterIMG);

  const titleB = document.querySelector("#what b");
  titleB.textContent = obj.title;
  const titleClass = document.querySelector(".title");
  titleClass.textContent = obj.title;
  const galleryClass = document.querySelector(".gallery");
  galleryClass.textContent = obj.author;
  const dateClass = document.querySelector(".date");
  dateClass.textContent = obj.date;
  const infoClass = document.querySelector(".info");
  infoClass.textContent = obj.info;

  const coverImage = document.querySelector('#image');
  coverImage.style.backgroundImage = `url(${obj.src})`;
}

populate();
