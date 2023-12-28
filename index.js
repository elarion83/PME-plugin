jQuery(document).ready(function() {

    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        
        function getPostDatas() {
            var bodyClassesArray = document.body.className.split(" ");
            var classWithPostId = ''
            var classWithPostParentId = '';
            var classWithpageTemplate =  '';
            for (var i = 0; i < bodyClassesArray.length; i++) {
                if(bodyClassesArray[i].startsWith("page-id-")) {
                    classWithPostId = bodyClassesArray[i].substring(8);
                }
                if(bodyClassesArray[i].startsWith("parent-pageid-")) {
                    classWithPostParentId = bodyClassesArray[i].substring(14);
                }
                if(bodyClassesArray[i].startsWith("page-template-template-")) {
                    classWithpageTemplate = bodyClassesArray[i].substring(23);
                }
            } 

            var environment = "Production";
            if(document.URL.startsWith('https://www.ver')) {
                environment = 'RMOE'
            }
            if(document.URL.startsWith('https://www.val')) {
                environment = 'RMOA'
            }
            if(document.URL.startsWith('https://www.homol')) {
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

  }
);
