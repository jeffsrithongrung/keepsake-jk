// Gallery renderer + video lazy-init.
// FRIENDS, SITE, and VIDEO_BASE_URL come from friends.js.

function renderGallery() {
  const container = document.getElementById("cards");
  const template = document.getElementById("cardTemplate");
  if (!container || !template) return;

  window.FRIENDS.forEach((friend) => {
    const node = template.content.firstElementChild.cloneNode(true);
    node.style.setProperty("--card-color", friend.color);
    node.dataset.id = friend.id;

    node.querySelector(".card-name").textContent = friend.name;
    const relEl = node.querySelector(".card-relationship");
    relEl.textContent = friend.relationship || "";

    const face = node.querySelector(".card-face");
    const player = node.querySelector(".card-player");
    const video = player.querySelector("video");
    const closeBtn = player.querySelector(".card-close");

    face.addEventListener("click", () => openCard(node, video, friend));
    closeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      closeCard(node, video);
    });

    container.appendChild(node);
  });
}

function openCard(card, video, friend) {
  // Set src only on first open so we don't fetch 11 videos up front.
  if (!video.src) {
    if (window.VIDEO_BASE_URL) {
      const base = window.VIDEO_BASE_URL.replace(/\/$/, "") + "/" + friend.file;
      video.src = friend.startAt ? base + "#t=" + friend.startAt : base;
    } else {
      // No upload URL configured yet — show a friendly local fallback message.
      const fallback = document.createElement("p");
      fallback.style.cssText = "padding:18px;font-family:var(--serif);font-style:italic;color:var(--ink-soft);margin:0;";
      fallback.textContent = "(video will appear here once " + friend.file + " is uploaded)";
      video.replaceWith(fallback);
    }
  }
  card.querySelector(".card-player").hidden = false;
  card.dataset.state = "open";
  if (video.src) {
    video.play().catch(() => { /* user-gesture issues are fine; controls remain visible */ });
  }
}

function closeCard(card, video) {
  if (video && typeof video.pause === "function") video.pause();
  card.querySelector(".card-player").hidden = true;
  card.dataset.state = "closed";
}
