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
  if (event.data.html) {
    document.getElementById('body').innerHTML = event.data.html
  } else {
    document.getElementById('body').innerHTML = 'nodata'
  }
});

document.addEventListener('DOMContentLoaded', function () {
  chrome.windows.getAll({populate: true}, function (windows) {
    render('all_tabs', {windows: windows})
  });
});

// chrome.browserAction.onClicked.addListener(function () {
//   render('hello', {thing: 'world'})
// });

// window.onload = function () {
//   render('hello', {thing: 'world'})
// };

// chrome.browserAction.onClicked.addListener(function() {
//   var iframe = document.getElementById('theFrame');
//   var message = {
//     command: 'render',
//     context: {thing: 'world'}
//   };
//   iframe.contentWindow.postMessage(message, '*');
// });

// window.addEventListener('message', function(event) {
//   if (event.data.html) {
//     new Notification('Templated!', {
//       icon: 'icon.png',
//       body: 'HTML Received for "' + event.data.name + '": `' +
//           event.data.html + '`'
//     });
//   }
// });
