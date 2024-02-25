const makeThumbURL = (videoID) => `https://img.youtube.com/vi/${videoID}/0.jpg`;
const makeThumb = (src) => {
  const img = document.createElement("img");
  img.src = src;
  img.style.float = "right";
  img.style.height = "120px";
  img.style.marginLeft = "5px";
  return img;
};

const findVideoIDExpr = /watch\?v=([0-9a-zA-Z-_]+)/;
const findVideoID = (url) => url.match(findVideoIDExpr)?.[1];
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

chrome.runtime.sendMessage({}, () => {
  const tryAttach = setInterval(() => {
    if (document.readyState !== "complete") return;

    attachThumbs();
    clearInterval(tryAttach);
  }, 10);
});
