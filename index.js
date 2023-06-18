import { galleryItems } from "./gallery-items.js";

// Change code below this line

const galleryRef = document.querySelector(".gallery");

const galleryMarkup = createImgMarkup(galleryItems);
galleryRef.insertAdjacentHTML("beforeend", galleryMarkup);

galleryRef.addEventListener("click", onImgContainerClick);

let img = null;

// Function to create the markup for each gallery item
function createImgMarkup(imgs) {
  return imgs
    .map(
      (item) => `
        <div class="gallery__item">
          <a class="gallery__link" href="${item.original}">
            <img
              class="gallery__image"
              src="${item.preview}"
              data-source="${item.original}"
              alt="${item.description}"
            />
          </a>
        </div>
      `
    )
    .join("");
}

// Function to handle modal close event
function onModalClose(evt) {
  // Check if the "Escape" key is pressed and if the img variable is defined
  if (evt.code === "Escape" && img) {
    // Call the close method on the img object to close the modal
    img.close();
  }
}

// Function to handle click event on gallery images
function onImgContainerClick(event) {
  // Prevent the default behavior of the click event
  event.preventDefault();

  // Check if the clicked element has the class name "gallery__image"
  const isImageEl = event.target.classList.contains("gallery__image");
  if (!isImageEl) {
    // If the clicked element is not an image, return early and do nothing
    return;
  }

  // Retrieve the data-source attribute value, which represents the URL of the large image
  const imgBigUrl = event.target.dataset.source;

  // Create a BasicLightbox instance with the large image URL as the source
  img = basicLightbox.create(
    `<img src="${imgBigUrl}" width="800" height="600">`,
    {
      onShow: (instance) => {
        // Add an event listener for the "keydown" event to handle modal close
        window.addEventListener("keydown", onModalClose);
      },
      onClose: (instance) => {
        // Remove the event listener when the modal is closed
        window.removeEventListener("keydown", onModalClose);
      },
    }
  );

  // Show the modal with the large image
  img.show();
}
