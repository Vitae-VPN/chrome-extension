
window.onload = function () {
    document.getElementById("setup").onclick = () => {setupProxy(document.getElementById('host').value);}
    document.getElementById("end").onclick = endProxy;

    chrome.proxy.settings.get(
        {'incognito': false},
        function(config) {
          document.getElementById("settings").innerText = JSON.stringify(config);
        }
    );
}

function setupProxy(host) {

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
    }, function() {});

    chrome.proxy.settings.get(
        {'incognito': false},
        function(config) {
          document.getElementById("settings").innerText = JSON.stringify(config);
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

    chrome.proxy.settings.get(
        {'incognito': false},
        function(config) {
          document.getElementById("settings").innerText = JSON.stringify(config);
        }
    );
}