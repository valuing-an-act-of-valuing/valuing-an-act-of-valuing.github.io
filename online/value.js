async function populate() {
  const requestURL = 'index.json';
  const request = new Request(requestURL);

  const response = await fetch(request);
  const json = await response.text();

  const index = JSON.parse(json);
  indexValue(index);
}

function indexValue(obj) {
  const head = document.querySelector('head');
  const titleValue = document.createElement('title');
  titleValue.textContent = `${obj.title} by ${obj.author}`;
  head.appendChild(titleValue);

  const what = document.querySelector('#what b');
  what.innerText = obj.title;

  const you = document.querySelector('#you');
  you.innerText = obj.author;

  const ogSite = document.createElement( "meta" );
  ogSite.setAttribute("property", "og:site_name");
  ogSite.setAttribute("content", obj.site);
  head.appendChild(ogSite);

  const ogURL = document.createElement( "meta" );
  ogURL.setAttribute("property", "og:url");
  ogURL.setAttribute("content", `${obj.site}${obj.page}`);
  head.appendChild(ogURL);

  const ogIMG = document.createElement( "meta" );
  const twitterIMG = document.createElement( "meta" );
  const coverImage = document.querySelector('#image');
  ogIMG.setAttribute("property", "og:image");
  twitterIMG.setAttribute("name", "twitter:image");
  ogIMG.setAttribute("content", `${obj.site}${obj.page}${obj.src}`);
  twitterIMG.setAttribute("content", `${obj.site}${obj.page}${obj.src}`);
  coverImage.style.display = obj.img;
  coverImage.style.backgroundImage = `url(${obj.src})`;
  head.appendChild(ogIMG);
  head.appendChild(twitterIMG);
}

populate();

const valueCSS = document.createElement( "link" );
valueCSS.href = "../../online/value.css";
valueCSS.type = "text/css";
valueCSS.rel = "stylesheet";

document.getElementsByTagName("head")[0].appendChild(valueCSS);
