function onClickHandler(info, tab) {
    if (info.menuItemId == "sendtoicebox") {
        // console.log("item " + info.menuItemId + " was clicked");
        // console.log(tab.favIconUrl);
        // console.log(tab.url);
        // console.log(tab.title);
        // console.log(tab.id);
        // console.log(tab.windowId);
        chrome.storage.sync.get('pages', function(data) {
            // add tab to storage
            data.pages.push({
                title: tab.title, url: tab.url, icon: tab.favIconUrl});
            chrome.storage.sync.set({pages: data.pages}, function() {
                // close tab
                chrome.tabs.remove(tab.id);
                // pop a notification

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

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
    // Create one test item for each context type.
    var context = "page";
    var title = "Test '" + context + "' menu item";
    var id = chrome.contextMenus.create({
        "title": "Send page to Icebox", 
        "contexts": ["page", "selection"],
        "id": "sendtoicebox"
    });

    chrome.storage.sync.set({pages: []});
});