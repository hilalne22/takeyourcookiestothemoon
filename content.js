// Content script: Aktif sayfa URL'sini alıp background.js'ye iletiyoruz
chrome.runtime.sendMessage({
  action: 'checkCookies',
  url: window.location.href
});

