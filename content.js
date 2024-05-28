console.log('Content script loaded');

// Function to replace profile pictures
function replaceProfilePictures(imageUrl) {
  console.log('Replacing profile pictures');
  const profilePics = document.querySelectorAll('img.ember-view');
  profilePics.forEach(pic => {
    pic.src = imageUrl;
  });
}

// Request the background script to fetch the new profile picture
function fetchAndReplaceProfilePictures() {
  console.log('Requesting new profile picture');
  try {
    chrome.runtime.sendMessage(
      { action: 'fetchImage', resourcePath: 'images/new-profile-pic.jpg' },
      response => {
        if (response && response.error) {
          console.error('Failed to fetch image:', response.error);
        } else if (response && response.imageUrl) {
          console.log('Image fetched successfully:', response.imageUrl);
          replaceProfilePictures(response.imageUrl);
        } else {
          console.error('Invalid response received:', response);
        }
      }
    );
  } catch (error) {
    console.error('Error sending message to background script:', error);
    // Retry sending the message after a short delay
    setTimeout(fetchAndReplaceProfilePictures, 1000);
  }
}

// Run the function initially
fetchAndReplaceProfilePictures();

// Also run the function periodically to catch new posts loaded dynamically
setInterval(fetchAndReplaceProfilePictures, 3000);
