  window.addEventListener('load', function (evt) {
        chrome.extension.getBackgroundPage().chrome.tabs.executeScript(null, {
            file: 'payload.js'
        });;
    });


    chrome.runtime.onMessage.addListener(function (message) {
        document.getElementById('json-content').innerHTML = message;
    });