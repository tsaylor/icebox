function render(template_name, context) {
    var iframe = document.getElementById('theFrame');
    var message = {
        command: 'render',
        template_name: template_name,
        context: context
    };
    iframe.contentWindow.postMessage(message, '*');
}

window.addEventListener('message', function(event) {
    var command = event.data.command;
    switch(command) {
        case 'ready':
            display_page();
            break;
        case 'load_html':
            if (event.data.html) {
                document.getElementById('body').innerHTML = event.data.html
            } else {
                document.getElementById('body').innerHTML = 'nodata'
            }
            var items = document.getElementsByClassName('deleteable');
            Array.prototype.forEach.call(items, function(item) {
                item.addEventListener('click', function(evt) {
                    evt.preventDefault();
                    remove_from_icebox(evt.target.href);
                })
            });
            break;
    }
});

function display_page() {
    chrome.storage.sync.get('pages', function(data) {
        render('icebox_tabs', data);
    });
}

window.addEventListener('focus', display_page);

function remove_from_icebox(url) {
    // open new tab
    chrome.tabs.create({url: url, active: true})
    // remove from storage
    chrome.storage.sync.get('pages', function(data) {
        var newPages = data.pages.filter(function (element, index, array) {
            return element.url != url
        });
        chrome.storage.sync.set({pages: newPages});
    });
}