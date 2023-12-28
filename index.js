


/*

function onWindowLoad() { var message = document.querySelector('#message');

    chrome.tabs.query({ active: true, currentWindow: true }).then(function (tabs) {
        var activeTab = tabs[0];
        var activeTabId = activeTab.id;

        return chrome.scripting.executeScript({
            target: { tabId: activeTabId },
            // injectImmediately: true,  // uncomment this to make it execute straight away, other wise it will wait for document_idle
            func: DOMtoString,
            // args: ['body']  // you can use this to target what element to get the html for
        });

    }).then(function (results) {
        console.log(results[0].result);
    }).catch(function (error) {
        console.log('There was an error injecting script : \n' + error.message);
    });
}
window.onload = onWindowLoad;

function DOMtoString(selector) {
    if (selector) {
        selector = document.querySelector(selector);
        if (!selector) return "ERROR: querySelector failed to find node"
    } else {
        selector = document.documentElement;
    }
    return selector.outerHTML;
}


jQuery('#txt_environnement').text('ee');

console.log('aa');
console.log(document.getElementsByTagName("body"));
console.log(jQuery('body'));

jQuery(function() {
    jQuery('#txt_environnement').text(document.getElementsByTagName("body")[0].className);
 }); */