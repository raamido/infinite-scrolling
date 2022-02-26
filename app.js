const key = "OymF8oUgJ_u6DIIPyDxq0J31HLH8gruqloJc7nBV_4U";
const API_URL = `https://api.unsplash.com/photos/random?client_id=${key}&count=11&orientation=squarish`;
const photosContainer = document.querySelector(".gallery");
const spinner = document.querySelector(".spinner");
let photosArray = [];

const displayPhotos = () => {
  photosArray.forEach((photo) => {
    const photoContainer = document.createElement("div");
    photoContainer.classList.add("photo_container");
    photoContainer.setAttribute("tabindex", "0");
    const img = document.createElement("img");
    img.setAttribute("src", photo.urls.regular);
    photoContainer.append(img);
    photosContainer.append(photoContainer);
  });
  IO.observe(photosContainer.lastChild);
};

const IO = new IntersectionObserver((entries, observer) => {
  const [lastPhoto] = entries;
  const lastPhotoIsLoaded = lastPhoto.target.querySelector("img").complete;
  if (lastPhoto.isIntersecting && lastPhotoIsLoaded) {
    observer.unobserve(lastPhoto.target);
    getPhotos();
  }
});

const getPhotos = async () => {
  spinner.hidden = false;
  try {
    const response = await fetch(API_URL);
    photosArray = await response.json();
    displayPhotos();
  } catch {
    alert(`couldn't fetch photos`);
  } finally {
    spinner.hidden = true;
  }
};

getPhotos();
