// Description: This script is injected into the webpage and replaces station names with their REAL names.

// Interval in millis to wait before trying to replace station names
const delayIntervalMs = 350

// Stations data in dictionarry
// im storing it in global variable to avoid fetching it every time
var cities = {}

// Replace text in element with station name if old text exists as key in stations object
function manipulateMapElement(cityName, element, attribute) {
    let text = element[attribute]
    if (text != undefined) {
        let replaceWith = cities[cityName][text]
        if (replaceWith != undefined) {
            element[attribute] = replaceWith
        }
    }
}

// Replace station names in whole webpage
function renderStations(cityName) {
    document
        .querySelectorAll('tspan, span, div.route-masstransit-step-view__title')
        .forEach((element) => { manipulateMapElement(cityName, element, 'innerHTML') })

    document
        .querySelectorAll('input')
        .forEach((element) => { manipulateMapElement(cityName, element, 'value') })
}

// In some cases website is not fully loaded, so we need to wait a bit and try again
// And for other cases i put another direct call to renderStations() for faster rendering
function renderStationsReliable(cityName) {
    setTimeout(
        function() { renderStations(cityName) },
        delayIntervalMs
    )
    renderStations(cityName)
}

// Extract city name from a page URL
// Example: https://yandex.ru/metro/moscow?scheme_id=sc34974011 -> moscow
function getCityName(pageUrl) {
    let urlElements = pageUrl
        .split('?')[0]
        .split('/')
    let prevElementIndex = urlElements.findIndex((element) => element == 'metro')
    let city = urlElements[prevElementIndex + 1]
    return city
}

// Main calls on every page load or change
// Fetch stations data if not loaded yet
function main(cityName) {
    if (cities[cityName] == undefined) {
        let pageUrl = chrome.runtime.getURL(`stations_data/${cityName}.json`)
        fetch(pageUrl)
            .then(response => response.json())
            .then(data => {
                cities[cityName] = data
                renderStationsReliable(cityName)
            })
            .catch(error => console.error('Error fetching stations:', error))
    } else {
        renderStationsReliable(cityName)
    }
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener(function(message) {
    if (message && message.type === 'pageRendered') {
        main(getCityName(message.url))
    }
})

