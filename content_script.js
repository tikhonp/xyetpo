// Description: This script is injected into the webpage and replaces station names with their REAL names.

// Interval in millis to wait before trying to replace station names
const delayIntervalMs = 350

// Stations data loaded from JSON file "stations_data.json"
// im storing it in global variable to avoid fetching it every time
var stations = undefined

// Replace text in element with station name if old text exists as key in stations object
function manipulateMapElement(element, attribute) {
    let text = element[attribute]
    if (text != undefined) {
        let replaceWith = stations[text]
        if (replaceWith != undefined) {
            element[attribute] = replaceWith
        }
    }
}

// Replace station names in whole webpage
function renderStations() {
    document
        .querySelectorAll('tspan, span, div.route-masstransit-step-view__title')
        .forEach((element) => { manipulateMapElement(element, 'innerHTML') })

    document
        .querySelectorAll('input')
        .forEach((element) => { manipulateMapElement(element, 'value') })
}

// In some cases website is not fully loaded, so we need to wait a bit and try again
// And for other cases i put another direct call to renderStations() for faster rendering
function renderStationsReliable() {
    setTimeout(
        function() { renderStations() },
        delayIntervalMs
    )
    renderStations()
}

function getStationsDataUrl(pageUrl) {
    let city = pageUrl
        .split('?')[0]
        .split('/')
        .slice(-1)[0]
    return chrome.runtime.getURL(`stations_data/${city}.json`)
}

// Main calls on every page load or change
// Fetch stations data if not loaded yet
function main(pageUrl) {
    if (stations == undefined) {
        fetch(getStationsDataUrl(pageUrl))
            .then(response => response.json())
            .then(data => {
                stations = data
                renderStationsReliable()
            })
            .catch(error => console.error('Error fetching stations:', error))
    } else {
        renderStationsReliable()
    }
    getStationsDataUrl(pageUrl)
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener(function(message) {
    if (message && message.type === 'pageRendered') {
        main(message.url)
    }
})

