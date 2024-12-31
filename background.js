chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  if (tabs.length > 0) {
    const activeTab = tabs[0];
    const activeTabUrl = activeTab.url;

    if (activeTabUrl) {
      // Aktif sekmenin URL'sini Flask sunucusuna gönderiyoruz
      fetch("http://127.0.0.1:5000/get_cookies", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: activeTabUrl })  // URL'yi JSON formatında gönderiyoruz
      })
        .then(response => response.json())
        .then(data => {
          if (data.cookies) {
            console.log("Filtered cookies:", data.cookies);  // Gelen çerezleri konsola yazdırıyoruz
          } else {
            console.log("No cookies found.");
          }
        })
        .catch(error => {
          console.error('Error checking cookies:', error);
        });
    } else {
      console.error('No URL found for the active tab');
    }
  } else {
    console.error('No active tab found');
  }
});
