'use strict'

async function showJSON(requestURL) {
    const request = new Request(requestURL)
    const response = await fetch(request)
    const indexAll = await response.text()
    const json = JSON.parse(indexAll)
    indexShow(json)
}