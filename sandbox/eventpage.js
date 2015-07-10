// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


function render(template_name, context) {
  var iframe = document.getElementById('theFrame');
  var message = {
    command: 'render',
    template_name: template_name,
    context: context
  };
  iframe.contentWindow.postMessage(message, '*');
}

chrome.browserAction.onClicked.addListener(function () {
  render('hello', {thing: 'world'})
});

window.addEventListener('message', function(event) {
  if (event.data.html) {
    document.getElementById('body').innerHTML = event.data.html
  }
});
