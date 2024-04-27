(() => {
    chrome.webNavigation.onHistoryStateUpdated.addListener(
        details => {
            chrome.tabs.sendMessage(details.tabId, { type: 'pageRendered' });
        },
        { url: [{ hostSuffix: 'yandex.ru' }] }
    );
})();

