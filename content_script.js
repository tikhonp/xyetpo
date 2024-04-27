(() => {
    const manipulateMapElement = (element, data) => {
        let text = element.innerHTML
        for (let station of data) {
            if (text.includes(station.original_name)) {
                element.innerHTML = element.innerHTML.replace(station.original_name, station.replace_with)
            }
        }
    }

    const renderStations = () => {
        let url = chrome.runtime.getURL('stations_data.json')
        setTimeout(function() {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    const elements = document.getElementsByTagName('tspan');
                    for (let item of elements) {
                        manipulateMapElement(item, data)
                    }

                    const popupElements = document.getElementsByTagName('span')
                    for (let item of popupElements) {
                        manipulateMapElement(item, data)
                    }

                    const divElements = document.getElementsByClassName('route-masstransit-step-view__title')
                    for (let item of divElements) {
                        manipulateMapElement(item, data)
                    }

                    const inputElements = document.getElementsByTagName('input')
                    for (let item of inputElements) {
                        for (let station of data) {
                            if (item.value.includes(station.original_name)) {
                                item.value = station.replace_with
                            }
                        }
                    }
                })
        }, 200);
    }

    chrome.runtime.onMessage.addListener(function(request) {
        if (request && request.type === 'pageRendered') {
            renderStations()
        }
    });

    renderStations()
})();
