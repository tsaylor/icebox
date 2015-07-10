function render(template_name, context) {
  var iframe = document.getElementById('theFrame');
  var message = {
    command: 'render',
    template_name: template_name,
    context: context
  };
  iframe.contentWindow.postMessage(message, '*');
}

function display_page() {
    chrome.storage.local.get('pages', function(data) {
        render('icebox_tabs', data);
    });
}

window.addEventListener('message', function(event) {
  var command = event.data.command;
  switch(command) {
    case 'ready':
      display_page();
    case 'load_html':
      if (event.data.html) {
        document.getElementById('body').innerHTML = event.data.html
      } else {
        document.getElementById('body').innerHTML = 'nodata'
      }
    break;
  }
});