'use strict'

async function indexJSON(requestURL) {
    const request = new Request(requestURL)
    const response = await fetch(request)
    const indexAll = await response.text()
    const json = JSON.parse(indexAll)
    indexGallery(json)
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

    if (obj.archive) {
        document.body.className = 'archive'
        const end = document.querySelector('#end')
        const archiveAll = obj.archive
        for (const iiii of archiveAll) {
            const div = document.createElement('div')
            if (iiii.txt) {
                const p = document.createElement('p')
                p.className = 'shadow'
                div.appendChild(p)
                for (const i of iiii.txt) {
                    p.innerHTML += i + '<br>'
                }
                p.style.placeSelf = iiii.place
            }

            if (iiii.img) {
                div.style.backgroundImage = `url(${iiii.img})`
                div.style.backgroundSize = iiii.size
            }
            end.insertAdjacentElement("beforebegin", div);

        }
    }

    const h1 = document.querySelector('h1')
    const cover = document.querySelector('#cover')

    if (document.body.className === 'archive') {
        cover.style.backgroundImage = `url(${obj.poster})`
    } else {
        h1.addEventListener('click', function () {
            document.body.classList.toggle('enter')
        });
    }

    const h2 = document.querySelector('main h2')
    h2.textContent = document.querySelector('title').textContent

    if (obj.img) {
        let i = 0
        cover.style.backgroundImage = `url(${obj.img[i]})`

        window.setInterval(function () {
            if (i === obj.img.length - 1) {
                i = 0
            } else if (i => obj.img.length - 1) {
                i++
            }
            cover.style.backgroundImage = `url(${obj.img[i]})`
        }, 2022);
    }

    if (obj.video) {
        let ii = 0
        const video = document.createElement('video')
        cover.appendChild(video)

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            video.muted = true
            video.setAttribute('muted', 'true')
            video.setAttribute('playsinline', 'true')
            video.setAttribute('poster', obj.poster)
        }

        const source = document.createElement('source')
        source.setAttribute("type", "video/mp4")
        source.src = obj.video[ii]
        video.appendChild(source)
        video.load()

        h1.addEventListener('click', function () {
            if (document.body.className === "enter") {
                video.play()
            } else {
                video.pause()
            }
        });

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
    }

    const value = document.querySelector('#value')

    if (obj.description) {
        const description = document.querySelector('meta[name="description"]').getAttribute('content')
        const h3 = document.createElement('h3')
        h3.innerHTML = description.replace('|', '<br>')
        value.appendChild(h3)

        const descriptionAll = obj.description
        for (const eachP of descriptionAll) {
            const p = document.createElement('p')
            p.innerHTML = eachP
            value.appendChild(p)
        }
    }

    if (obj.index) {
        const indexAll = obj.index
        for (const iii of indexAll) {
            const ul = document.createElement('ul')
            value.appendChild(ul)

            const thisIndex = iii
            const u = document.createElement('u')
            u.textContent = thisIndex.subtitle
            ul.appendChild(u)

            const showAll = thisIndex.show
            showAll.forEach((iiii) => {
                const li = document.createElement('li')
                li.innerHTML = `
                <time>${iiii.date}</time><br/>
                <a href="${iiii.link}">${iiii.title}</a>
                <p>${iiii.description}</p>
                `
                ul.appendChild(li)
            })
        }
    }
}