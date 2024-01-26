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

if (locationUrl.toLowerCase().includes("facebook")) {
  facebookFeatures();
}
