document.addEventListener('DOMContentLoaded', function () {
    chrome.windows.getAll({populate: true}, function (windows) {
        for (w in windows) {
            document.getElementById('body').innerHTML += '<p>' + windows[w].id + '</p>';
            for (t in windows[w].tabs) {
                document.getElementById('body').innerHTML += '<p>&nbsp;&nbsp;&nbsp;&nbsp;' + windows[w].tabs[t].url + '</p>'
            }
        }
    });
});
