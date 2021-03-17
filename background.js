
function setupProxy(host) {

    var config = {
        mode: "fixed_servers",
        rules: {
            proxyForHttp: {
            scheme: "socks5",
            host: "1.2.3.4"
            },
            bypassList: []
        }
    };

    chrome.proxy.settings.set({
        value: config,
        scope: 'regular'
    }, function() {});

}