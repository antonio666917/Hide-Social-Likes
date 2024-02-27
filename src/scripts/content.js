const locationUrl = window.location.toString();
console.log(`load content.js on ${locationUrl}`);

const facebookFeatures = () => {
  let observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type !== "childList") {
        continue;
      }

      let getAllLikeCountToolbars = document.querySelectorAll(
        "span[role='toolbar']"
      );
      let getAllLikeUIToolbars = document.querySelectorAll(
        "[aria-label='Like']"
      );

      getAllLikeCountToolbars.forEach((element) => {
        let parentElement = element.parentElement;
        if (parentElement) {
          parentElement.style.display = "none";
          let nextParentElement = parentElement.parentElement;
          if (nextParentElement) {
            nextParentElement.style.display = "none";
          }
        }
      });
      getAllLikeUIToolbars.forEach((element) => {
        let parentElement = element.parentElement;
        if (parentElement) {
          parentElement.style.display = "none";
        }
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

const instagramFeatures = () => {
  let observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type !== "childList") {
        continue;
      }

      let getAllLikeCountToolbars = document.querySelectorAll(
        'a[href*="/liked_by/"]'
      );

      let getAllLikeUIToolbars = document.querySelectorAll(
        "[aria-label='Like']"
      );

      getAllLikeCountToolbars.forEach((element) => {
        let parentElement = element.parentElement;
        if (parentElement) {
          parentElement.style.display = "none";
        }
      });

      getAllLikeUIToolbars.forEach((element) => {
        let parentElement = element.parentElement;
        if (parentElement) {
          parentElement.style.display = "none";
          let nextParentElement = parentElement.parentElement;
          if (nextParentElement) {
            nextParentElement.style.display = "none";
          }
        }
      });
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
};

const featuresMap = {
  'facebook': facebookFeatures,
  'instagram': instagramFeatures
};

const locationUrlLower = locationUrl.toLowerCase();

for (const [site, features] of Object.entries(featuresMap)) {
  if (locationUrlLower.includes(site)) {
    features();
    break; // stop searching once a match is found
  }
}
