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
  const valueIndex = "https://creative-community.space/value/"
  titleValue.textContent = `${obj.title} by ${obj.author}`;
  head.appendChild(titleValue);

  const what = document.querySelector('#what b');
  what.innerText = obj.title;

  const you = document.querySelector('#you');
  you.innerText = obj.author;

  const authorValue = document.createElement( "meta" );
  authorValue.setAttribute("name", "author");
  authorValue.setAttribute("content", obj.author);
  head.appendChild(authorValue);

  const ogURL = document.createElement( "meta" );
  ogURL.setAttribute("property", "og:url");
  ogURL.setAttribute("content", `${valueIndex}${obj.appreciate}${obj.page}`);
  head.appendChild(ogURL);

  const ogIMG = document.createElement( "meta" );
  ogIMG.setAttribute("property", "og:image");
  ogIMG.setAttribute("content", `${valueIndex}${obj.appreciate}${obj.page}${obj.img}`);
  head.appendChild(ogIMG);

  const twitterIMG = document.createElement( "meta" );
  twitterIMG.setAttribute("name", "twitter:image");
  twitterIMG.setAttribute("content", `${valueIndex}${obj.appreciate}${obj.page}${obj.img}`);
  head.appendChild(twitterIMG);
}

populate();

const valueCSS = document.createElement( "link" );
valueCSS.href = "https://creative-community.space/value/online/value.css";
valueCSS.type = "text/css";
valueCSS.rel = "stylesheet";

document.getElementsByTagName("head")[0].appendChild(valueCSS);
