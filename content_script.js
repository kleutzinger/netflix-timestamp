function hmsToSec (str) {
  let p = str.split(':');
  let s = 0;
  let m = 1;
  while (p.length > 0) {
    s += m * parseInt(p.pop(), 10);
    m *= 60;
  }
  return s;
}

function getTime () {
  return $('video').prop('currentTime');
}

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.action === 'getTime') {
      sendResponse({
        url: window.location.href,
        time: getTime()
      });
    }
  }
);
