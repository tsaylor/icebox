function onClickHandler(info, tab) {
    if (info.menuItemId == "sendtoicebox") {
        chrome.storage.sync.get('pages', function(data) {
            // add tab to storage
            data.pages.push({
                title: tab.title, url: tab.url, icon: tab.favIconUrl});
            chrome.storage.sync.set({pages: data.pages}, function() {
                // close tab
                chrome.tabs.remove(tab.id);
                // pop a notification
                chrome.notifications.create('icebox-savetab', {
                    type: "basic",
                    message: "Saved \""+tab.title+"\"",
                    title: "Saved Tab",
                    iconUrl: "/icon128.png"
                }, function(id) {return id});
            });
        });
    }
};

chrome.contextMenus.onClicked.addListener(onClickHandler);
// chrome.storage.onChanged.addListener(function () {
//     chrome.storage.sync.get('pages', function(data) {
//         chrome.storage.sync.getBytesInUse(null, function(count){
//             console.log("bytes in use: " + count)
//         });
//     });
// })

chrome.runtime.onInstalled.addListener(function(details) {
    var id = chrome.contextMenus.create({
        "title": "Send page to Icebox", 
        "contexts": ["page", "selection"],
        "id": "sendtoicebox"
    });

    // data migrations
    var previousVersion = details.reason == "install" ? "0" : details.previousVersion
    switch (previousVersion) {
        case "0":
            // on fresh install, initialize the storage data
            chrome.storage.sync.set({pages: [], settings: {storage: "chrome"}});
    }
});