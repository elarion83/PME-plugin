jQuery(document).ready(function() {
    jQuery('.navigationTabs').tabs();
    $('.enablersCollapse').collapsible();

    // On utilise chrome.tabs.query etc pour récuperer le contenu de la page. Sinon le DOM récupéré est celui de index.html 
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        

        function getPostDatas() {
            var bodyClassesArray = document.body.className.split(" ");
            for (var i = 0; i < bodyClassesArray.length; i++) {
                var className = bodyClassesArray[i];
                if(className.startsWith("page-id-") ) { var classWithPostId = className.substring(8); }
                else if(className.startsWith("parent-pageid-")) { var classWithPostParentId = className.substring(14); }
                else if(className.startsWith("page-template-template-")) { var classWithpageTemplate = className.substring(23); }
                else if(className.startsWith("kameleoon-market-")) { var classWithpageMarket = className.substring(17); }
            } 

            var environment = "Production";
            var docUrl = document.URL;
            if(docUrl.startsWith('https://www.ver')) {
                environment = 'RMOE'
            }
            else if(docUrl.startsWith('https://www.val')) {
                environment = 'RMOA'
            }
            else if(docUrl.startsWith('https://www.homol')) {
                environment = 'Homologation'
            }

            var version = document.getElementById("bpce-rgpd-js").src.split("=")[1];
            var region = document.getElementById("bpce-redirection-clients-navigation-cookie-js-extra").text.split('"region":"')[1].split('"}')[0];

            var datas = new Object;
            datas.postId = classWithPostId;
            datas.postParentId = classWithPostParentId;
            datas.pageTemplate = classWithpageTemplate;
            datas.environment = environment;
            datas.region = region;
            datas.version = version;
            datas.market = classWithpageMarket;
            (async () => {
                const response = await chrome.runtime.sendMessage({datas: datas});
            })();
        };

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: getPostDatas,
        }).then();

    });

    jQuery(".copybtn").click(function() {
        var dataToCopy = jQuery(this).attr('copyData');
        navigator.clipboard.writeText(jQuery(dataToCopy).text());
    });
});

chrome.runtime.onMessage.addListener(
  function(request) {
    var datas = request.datas;
    document.getElementById("postId").innerText = datas.postId;
    document.getElementById("postParentId").innerText = datas.postParentId;
    document.getElementById("environment").innerText = datas.environment;
    document.getElementById("version").innerText = datas.version;    
    document.getElementById("region").innerText = datas.region;
    document.getElementById("pageTemplate").innerText = datas.pageTemplate;
    document.getElementById("market").innerText = datas.market;
  }
);
