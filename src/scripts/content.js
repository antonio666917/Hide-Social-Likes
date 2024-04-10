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

const threadsFeatures = () => {
  let observer = new MutationObserver((mutationsList) => {
    for (let mutation of mutationsList) {
      if (mutation.type !== "childList") {
        continue;
      }

      let getAllLikeCountToolbars = []
      // Using XPath to select all <span> elements whose text content contains "like"
      const likeXpathExpression = "//span[contains(text(), ' like') and not(number(substring-before(text(), ' like')) = 0)]";
      const likeSpans = document.evaluate(likeXpathExpression, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
      // Loop through the snapshot of nodes and convert it into an array
      for (let i = 0; i < likeSpans.snapshotLength; i++) {
        getAllLikeCountToolbars.push(likeSpans.snapshotItem(i));
      }

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
  'instagram': instagramFeatures,
  'threads': threadsFeatures
};

const locationUrlLower = locationUrl.toLowerCase();

for (const [site, features] of Object.entries(featuresMap)) {
  if (locationUrlLower.includes(site)) {
    features();
    break; // stop searching once a match is found
  }
}
