chrome.runtime.onInstalled.addListener(() => {
  console.log('Cookie Blocker Extension Installed!');
});

// Mesaj dinleyicisini background.js'ye ekleyelim
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'checkCookies' && message.url) {
    fetch("http://localhost:5000/get_cookies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: message.url })
    })
    .then(response => response.json())
    .then(data => {
      if (data.cookies) {
        console.log("Filtered cookies:", data.cookies);
      } else {
        console.log("No cookies found.");
      }
    })
    .catch(error => {
      console.error('Error checking cookies:', error);
    });
  }
});



