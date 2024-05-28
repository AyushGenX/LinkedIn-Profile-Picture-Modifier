chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'fetchImage') {
      // Replace this with the correct path to your image
      const imageUrl = chrome.runtime.getURL('images/new-profile-pic.jpg');
      sendResponse({ imageUrl: imageUrl });
      return true; // Required to indicate that sendResponse will be called asynchronously
    }
  });
  