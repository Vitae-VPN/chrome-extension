
window.onload = function () {
    document.getElementById("setup").onclick = () => {setupProxy(document.getElementById('host').value);}
    document.getElementById("end").onclick = endProxy;

    propogateConfigToUI();
}

function setupProxy(host) {

    chrome.proxy.settings.get(
        {'incognito': false},
        function(config) {

            if (config.value.mode == "system") {
                var config = {
                    mode: "fixed_servers",
                    rules: {
                        proxyForHttp: {
                            scheme: "http",
                            host: host
                        },
                        proxyForHttps: {
                            scheme: "http",
                            host: host
                        },
                        bypassList: []
                    }
                };
            
                chrome.proxy.settings.set({
                    value: config,
                    scope: 'regular'
                }, function() {
                    propogateConfigToUI();
                    window.open("https://vitae-cdn.netlify.app/extension/connect/");
                });

            } else {
                if (confirm("The proxy is already configured, so you will be taken to the test page. If you want to disable the proxy, click 'Terminate' in the extension. If you do not want to be navigated to the test page, click 'Cancel'.")) {
                    window.open("https://vitae-cdn.netlify.app/extension/connect/");
                }
            }
        }
    );

}

function endProxy() {
    var config = {
        mode: "system"
    };

    chrome.proxy.settings.set({
        value: config,
        scope: 'regular'
    }, function() {});

    propogateConfigToUI();

}

function propogateConfigToUI() {

    chrome.proxy.settings.get(
        {'incognito': false},
        function(config) {

            console.dir(config)

            document.getElementById("settings").innerText = JSON.stringify(config);
          
            if (config.value.mode == "fixed_servers") {
                document.getElementById("setup").innerHTML = "&#10004; Running!";
                document.getElementById("setup").classList.add("running");

                chrome.browserAction.setBadgeText({text: "ON"});
                chrome.browserAction.setBadgeBackgroundColor({color: "#00AF54"});

            } else {
                document.getElementById("setup").classList.remove("running");
                document.getElementById("setup").innerHTML = "start proxy";
                chrome.browserAction.setBadgeText({text: "OFF"});
                chrome.browserAction.setBadgeBackgroundColor({color: "#FF4A1C"});
            }

        }
    );

}