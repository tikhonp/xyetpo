// Description: fires an event on every page change to update station names
function main() {
    try {
        chrome.webNavigation.onHistoryStateUpdated.addListener(
            details => {
                chrome.tabs.sendMessage(
                    details.tabId,
                    {
                        type: 'pageRendered',
                        url: details.url,
                    }
                )
            },
            { url: [{ hostSuffix: 'yandex.ru' }] }
        )
    } catch (e) {
        console.error('Error in main:', e)
        main()
    }
}
main()

