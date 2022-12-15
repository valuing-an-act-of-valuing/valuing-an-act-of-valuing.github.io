async function populate() {
  const requestURL = 'index.json';
  const request = new Request(requestURL);

  const response = await fetch(request);
  const indexJson = await response.text();

  const indexIndex = JSON.parse(indexJson);
  indexHeader(indexIndex);
}

function indexHeader(obj) {
  const host = location.hostname;
  const head = document.querySelector('head');
  const titleIndex = document.createElement('title');
  const ogTitle = document.createElement('meta');
  titleIndex.textContent = `${obj.title} | ${obj.author}`;
  ogTitle.setAttribute("property", "og:title");
  ogTitle.setAttribute("content", `${obj.title} | ${obj.author}`);
  head.appendChild(titleIndex);
  head.appendChild(ogTitle);
  const title = document.querySelector("#what b");
  title.textContent = obj.title;
  const titleClass = document.querySelector(".title");
  titleClass.textContent = obj.title;

  const authorIndex = document.createElement( "meta" );
  authorIndex.setAttribute("name", "author");
  authorIndex.setAttribute("content", obj.author);
  head.appendChild(authorIndex);
  const galleryClass = document.querySelector(".gallery");
  galleryClass.textContent = obj.author;

  const descriptionIndex = document.createElement( "meta" );
  const ogDescription = document.createElement('meta');
  descriptionIndex.setAttribute("name", "description");
  ogDescription.setAttribute("property", "og:description");
  descriptionIndex.setAttribute("content", `${obj.date} | ${obj.info}`);
  ogDescription.setAttribute("content", `${obj.date} | ${obj.info}`);
  head.appendChild(descriptionIndex);
  head.appendChild(ogDescription);
  const dateClass = document.querySelector(".date");
  dateClass.textContent = obj.date;
  const infoClass = document.querySelector(".info");
  infoClass.textContent = obj.info;


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

populate();
