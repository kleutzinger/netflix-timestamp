function timestampGen (url, time) {
  url = url.split('?')[0];
  time = time | 0;
  url = url + '?t=' + time;
  return url;
}

function copyToClipboard (element) {
  var $temp = $('<input>');
  $('body').append($temp);
  $temp.val($(element).text()).select();
  document.execCommand('copy');
  $temp.remove();
}

window.addEventListener('DOMContentLoaded', function () {
  // ...query for the active tab...
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    // ...and send a request for the DOM info...
    chrome.tabs.sendMessage(
      tabs[0].id, {
        action: 'getTime',
        from: 'popup'
      },
      (resp) => {
        if (resp) {
          $('#message').text(timestampGen(resp.url, resp.time));
          $(document.body).append($('</p>').attr('id', 'copyText').text('Click to copy'));
        }
      });
  });
});

$(document).ready(() => {
  $(document.body).click(() => {
    if ($('#message').text() === "This isn't Netflix!") {
      return;
    }
    copyToClipboard($('#message'));
    $(document.body).css({
      backgroundColor: 'lightgreen'
    });
    $('#copyText').text('Copied to clipboard!');
  });
});
