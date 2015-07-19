var default_settings = {
    storage: 'chrome'
}

function restore_settings() {
    chrome.storage.sync.get('settings', function(data) {
        var settings = data.settings || {};
        if (Object.keys(settings).length == 0) {
            settings = JSON.parse(JSON.stringify(default_settings));
        }
        document.querySelector('input[name="storage"][value="'+settings.storage+'"]').checked = true;
    });
}

function save_settings() {
    var settings = {};
    var storage = document.querySelector('input[name="storage"]:checked');
    if (storage) {
        settings.storage = storage.value;
    }
    chrome.storage.sync.set({'settings': settings});
}

function export_data() {
    chrome.storage.sync.get(null, function(data) {
        var attachment = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data));
        var exportLink = document.getElementById('realexportlink');
        exportLink.setAttribute('href', 'data:' + attachment);
        exportLink.click();
    });
}

document.addEventListener('DOMContentLoaded', function() {
    restore_settings();
    document.getElementById('savebtn').addEventListener('click', save_settings);
    document.getElementById('exportbtn').addEventListener('click', export_data);
});
