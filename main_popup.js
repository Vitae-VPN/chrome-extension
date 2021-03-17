
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

    propogateConfigToUI();

    window.open("https://vitae-cdn.netlify.app/extension/connect/");

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
            } else {
                document.getElementById("setup").classList.remove("running");
            }

        }
    );

}