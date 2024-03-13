const { env } = require("../_helper/env");

module.exports = {
    ImageSearch
}

async function ImageSearch(searchString, { explicit = false, page = 0 } = {}) {
    const _query = {
        q: searchString,
        safe: { 1: 'off', 0: 'active' }[+explicit],
        searchType: "image",
        key: env('GoogleAPIKey'),
        cx: env('CustomSearchEngine'),
        num: 10,
        start: parseInt(page + "1"),
        filter: 1
    }

    const url = new URL('https://www.googleapis.com/customsearch/v1')
    for (const [key, value] of Object.entries(_query)) {
        url.searchParams.append(key, value);
    }

    const data = await fetch(url.toString()).then(a => a.json());

    let items = []
    for (const { link } of data.items) {
        // idk i might add more to this
        items.push(link)
    }

    return items;
}