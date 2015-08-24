function onClickHandler(info, tab) {
    if (info.menuItemId == "sendtoicebox") {
        chrome.storage.sync.get('pages', function(data) {
            // add tab to storage
            data.pages.push({title: tab.title, url: tab.url, icon: tab.favIconUrl});
            chrome.storage.sync.set({pages: data.pages}, function() {
                if (chrome.runtime.lastError) {
                    chrome.storage.sync.getBytesInUse('pages', function(count) {
                        console.log('You are using '+count+' bytes. Google allows 8192 bytes.');
                    });
                    chrome.notifications.create('icebox-saveerror', {
                        type: "basic",
                        message: "You are out of storage space.",
                        title: "Save Failure",
                        iconUrl: "/icon128.png"
                    }, function(id) {return id});
                } else {
                    // close tab
                    chrome.tabs.remove(tab.id);
                    // pop a notification
                    chrome.notifications.create('icebox-savetab', {
                        type: "basic",
                        message: "Saved \""+tab.title+"\"",
                        title: "Saved Tab",
                        iconUrl: "/icon128.png"
                    }, function(id) {return id});
                }
            });
        });
    }
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(function(details) {
    var id = chrome.contextMenus.create({
        "title": "Send page to Icebox", 
        "contexts": ["page", "selection"],
        "id": "sendtoicebox"
    });

    // data migrations
    var previousVersion = details.reason == "install" ? 0 : parseInt(details.previousVersion)
    if (previousVersion < 1) {
        // verify sync data is empty
        chrome.storage.sync.get(null, function(data) {
            if(!data['pages'] && !data['settings']) {
                // no data, initialize
                chrome.storage.sync.set({pages: [], settings: {storage: "chrome"}});
            }
        });
    }
});