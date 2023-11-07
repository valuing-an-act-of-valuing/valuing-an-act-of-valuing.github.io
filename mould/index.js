'use strict'

async function indexJSON(requestURL) {
    const request = new Request(requestURL)
    const response = await fetch(request)
    const indexAll = await response.text()
    const json = JSON.parse(indexAll)
    indexGallery(json)
    indexShow(json)
}

async function fetchMD(url = '', query = '') {
    fetch(url)
        .then(response => response.text())
        .then(md => {
            document.querySelector(query).innerText = md;
        });
}

function indexGallery(obj) {
    fetchMD(obj.readme, '#readme')
    
    const main = document.querySelector('main')
    const h1 = document.querySelector('main h1')
    h1.addEventListener('click', function () {
        document.body.classList.toggle('enter')
    }, false)

    const h2 = document.querySelector('main h2')
    h2.textContent = document.querySelector('title').textContent

    if (obj.video) {
        let ii = 0
        const video = document.createElement('video')
        main.appendChild(video)

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            video.muted = true
            video.setAttribute('muted', 'true')
            video.setAttribute('playsinline', 'true')
        }

        const source = document.createElement('source')
        source.setAttribute("type", "video/mp4")
        source.src = obj.video[ii]
        video.appendChild(source)

        video.addEventListener('ended', () => {
            if (obj.video.length === 0) {
                ii = 0
                source.src = obj.video[ii]
            } else if (ii === obj.video.length - 1) {
                ii = 0
                source.src = obj.video[ii]
            } else if (ii < obj.video.length - 1) {
                ii++
                source.src = obj.video[ii]
            }
            video.load()
            video.play()
        }, false)

        video.load()
        video.play()
    }
}

function indexShow(obj) {
    if (obj.show) {
        const show = document.querySelector('#show')
        const h3 = document.createElement('h3')
        const description = document.querySelector('meta[name="description"]').getAttribute('content')
        h3.textContent = description
        show.appendChild(h3)

        const ul = document.createElement('ul')
        show.appendChild(ul)

        const showAll = obj.show
        showAll.forEach((i) => {
            const li = document.createElement('li')
            li.innerHTML = `
            <time>${i.date}</time><br/>
            <a href="${i.link}">${i.title}</a>
            <p>${i.description}</p>
            `
            ul.appendChild(li)
        })

    }
}