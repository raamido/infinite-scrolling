const key = "OymF8oUgJ_u6DIIPyDxq0J31HLH8gruqloJc7nBV_4U";
const API_URL = `https://api.unsplash.com/photos/random?client_id=${key}&count=10&orientation=squarish`;

const getPhotos = async () => {
  const response = await fetch(API_URL);
  const images = await response.json();
  console.log(images);
};

getPhotos();
