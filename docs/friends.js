// EDIT THIS FILE to change names, relationships, or video URLs.
// `videoBaseUrl` is the GitHub Release URL prefix once you upload the MP4s.
// Until then, leave it blank — the player will show a friendly placeholder.
// `startAt` is the second to start playback at (intro/silence skipped). She can still
// scrub back to 0 if she wants — it's just where the video opens.

window.SITE = {
  herName: "Jenny Kim",
  noteLines: [
    "I talked to the people who love you most.",
    "They had a lot to say."
  ],
  petPhotos: [
    { src: "img/pet-cat.jpg", alt: "our cat with the ring", caption: "mom please say yes to dad" },
    { src: "img/pet-dog.jpg", alt: "our dog with the ring", caption: "I've wanted a mom my whole life" }
  ],
};

// Source video URL has #t=<startAt> appended so the intro is skipped automatically.
window.FRIENDS = [
  { id: "f1",  name: "Hazel",            relationship: "", file: "hazel.mp4",            color: "#E8D5C4", startAt:  45 },
  { id: "f2",  name: "Sue",              relationship: "", file: "sue.mp4",              color: "#D4C5E2", startAt: 131 }, // 2:11
  { id: "f3",  name: "Christine",        relationship: "", file: "cp.mp4",               color: "#C8DDD3", startAt: 327 }, // 5:27
  { id: "f4",  name: "Hilary",           relationship: "", file: "hilary.mp4",           color: "#F0D9B5", startAt: 138 }, // 2:18
  { id: "f5",  name: "Joyce",            relationship: "", file: "joyce.mp4",            color: "#E5C1CD", startAt:  44 },
  { id: "f6",  name: "Kat",              relationship: "", file: "kat.mp4",              color: "#C5D8E5", startAt: 320 }, // 5:20
  { id: "f7",  name: "Carol",            relationship: "", file: "carol.mp4",            color: "#DDD0B8", startAt:  60 }, // 1:00
  { id: "f8",  name: "Cyn",              relationship: "", file: "cyn.mp4",              color: "#E2C9C3", startAt: 111 }, // 1:51
  { id: "f9",  name: "Daniel",           relationship: "", file: "daniel.mp4",           color: "#C9D6BC", startAt:  60 }, // 1:00
  { id: "f10", name: "Kevin",            relationship: "", file: "kevin.mp4",            color: "#EAD7B7", startAt:  40 },
  { id: "f11", name: "Aaron",            relationship: "", file: "aaron.mp4",            color: "#D8C7DC", startAt: 157 }, // 2:37
  { id: "f12", name: "Alex & Rosalind",  relationship: "", file: "alex-and-rosalind.mp4", color: "#D6E0CC", startAt:  39 },
];

// Once you've created the GitHub Release and uploaded the MP4s, set this to:
//   https://github.com/Jeffy/<repo>/releases/download/v1
// Leave blank during development; cards will show a placeholder.
window.VIDEO_BASE_URL = "https://github.com/jeffsrithongrung/keepsake-jk/releases/download/v1";
