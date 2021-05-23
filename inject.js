const makeThumbURL = (videoID) => `https://img.youtube.com/vi/${videoID}/0.jpg`;
const makeThumb = (src) => {
  const img = document.createElement("img");
  img.src = src;
  img.style.float = "right";
  img.style.height = "125px";
  return img;
};

const findVideoID = (url) => url.match("v=([0-9a-zA-Z-_]+)")?.[1];
const findVideoURL = (elm) =>
  elm.querySelector(".item-meta > .item-meta-icons a[target=_blank]")?.href;

const attachThumbs = () => {
  const items = document.querySelectorAll("main .items article");
  if (!items?.length) return;

  for (const item of items) {
    const url = findVideoURL(item);
    if (!url) continue;
    const id = findVideoID(url);
    if (!id) continue;

    const thumbURL = makeThumbURL(id);
    const thumb = makeThumb(thumbURL);
    item.prepend(thumb);
  }
};

chrome.extension.sendMessage({}, () => {
  const tryAttach = setInterval(() => {
    if (document.readyState !== "complete") return;

    attachThumbs();
    clearInterval(tryAttach);
  }, 10);
});
