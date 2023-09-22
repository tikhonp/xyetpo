(() => {
    const manipulateElement = (element, data) => {
        let text = element.innerHTML
        for (let station of data) {
            if (text.includes(station.original_name)) {
                element.innerHTML = station.replace_with  // text.replace(station.original_name, station.replace_with)
            }
        }
    }

    const renderStations = () => {
        let url = chrome.runtime.getURL('stations_data.json')
        setTimeout(function(){
            fetch(url)
                .then(response=> response.json())
                .then(data => {
                    const elements = document.getElementsByTagName('tspan');
                    for (let item of elements) {
                        manipulateElement(item, data)
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