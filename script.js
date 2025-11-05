const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const dateBtn = document.getElementById("date");
const loveMessage = document.getElementById("loveMessage");
const brokenMessage = document.getElementById("brokenMessage");
const loveImage = document.getElementById("loveImage");
const dateImage = document.getElementById("dateImage");
const rejectImage = document.getElementById("rejectImage");

let loveAudio = new Audio("love.mp3");
let rejectAudio = new Audio("reject.mp3");
let dateAudio = new Audio("date.mp3");

// 🌸 Personal Vault Feature (Dynamic from Cloudinary)
// 🌸 Personal Vault Feature (Dynamic from Cloudinary)
const vaultBtn = document.getElementById("vault");
const vaultSection = document.getElementById("vaultSection");
const vaultImagesDiv = document.getElementById("vaultImages");
const correctPassword = "11112003";

const imageModal = document.getElementById("imageModal");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");

vaultSection.style.display = "none"; // hidden initially

vaultBtn.addEventListener("click", async () => {
  const confirmOpen = confirm("Do you want to see the personal vault? 💌");
  if (!confirmOpen) return;

  const enteredPassword = prompt("Enter the privacy password 🔐  \n hint: birth date ");
  if (enteredPassword !== correctPassword) {
    alert("Wrong password 😢");
    return;
  }

  alert("Access granted 💞");
  vaultSection.style.display = "block";
  vaultSection.scrollIntoView({ behavior: "smooth" });

  // Fetch images from your Node.js server (Cloudinary)
  vaultImagesDiv.innerHTML = "<p>Fetching photos from cloud ☁️...</p>";
  try {
    const res = await fetch("/api/vault");
    const data = await res.json();

    if (data.images && data.images.length > 0) {
      vaultImagesDiv.innerHTML = "";
      data.images.forEach((url) => {
        const img = document.createElement("img");
        img.src = url;
        img.alt = "Vault image";
        img.loading = "lazy";
        img.addEventListener("click", () => openImageModal(url));
        vaultImagesDiv.appendChild(img);
      });
    } else {
      vaultImagesDiv.innerHTML = "<p>No images found 😢</p>";
    }
  } catch (err) {
    vaultImagesDiv.innerHTML = "<p>Error loading images ⚠️</p>";
    console.error(err);
  }
});

// Open modal
function openImageModal(url) {
  modalImage.src = url;
  imageModal.style.display = "flex";
}

// Close modal
closeModal.addEventListener("click", () => {
  imageModal.style.display = "none";
});

// Close on background click
imageModal.addEventListener("click", (e) => {
  if (e.target === imageModal) {
    imageModal.style.display = "none";
  }
});

// Move "No" button away when mouse is close
document.addEventListener("mousemove", (e) => {
  const rect = noBtn.getBoundingClientRect();
  const distance = Math.hypot(
    e.clientX - (rect.left + rect.width / 2),
    e.clientY - (rect.top + rect.height / 2)
  );
  if (distance < 100) {
    const parentRect = noBtn.parentElement.getBoundingClientRect();
    const maxX = parentRect.width - rect.width - 10;
    const maxY = parentRect.height - rect.height - 10;
    noBtn.style.left = `${Math.random() * maxX}px`;
    noBtn.style.top = `${Math.random() * maxY}px`;
  }
});

// When clicking "Yes"
yesBtn.addEventListener("click", () => {
  rejectAudio.pause();
  dateAudio.pause();
  loveMessage.style.display = "block";
  brokenMessage.style.display = "none";
  loveImage.classList.add("show");
  dateImage.classList.remove("show");
  rejectImage.classList.remove("show");
  loveAudio.currentTime = 0;
  loveAudio.play();
  createBurstHearts();
  showFloatingNames();
});

// When clicking "No"
noBtn.addEventListener("click", () => {
  loveAudio.pause();
  dateAudio.pause();
  loveMessage.style.display = "none";
  brokenMessage.style.display = "block";
  loveImage.classList.remove("show");
  dateImage.classList.remove("show");
  rejectImage.classList.add("show");
  rejectAudio.currentTime = 0;
  rejectAudio.play();
  createBrokenHearts();
});

// When clicking "Date"
dateBtn.addEventListener("click", () => {
  loveAudio.pause();
  rejectAudio.pause();
  loveMessage.style.display = "none";
  brokenMessage.style.display = "none";
  loveImage.classList.remove("show");
  rejectImage.classList.remove("show");
  dateImage.classList.add("show");
  dateAudio.currentTime = 0;
  dateAudio.play();
  createBurstHearts();
  showFloatingNames("Let's Go on a Date 💑");
});

// Floating hearts
function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "💗";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 3 + "s";
  heart.style.fontSize = Math.random() * 20 + 10 + "px";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 200);

function createBurstHearts() {
  for (let i = 0; i < 100; i++) setTimeout(createHeart, i * 100);
}

// Floating Names
function showFloatingNames(textMessage = "T ❤️ Y") {
  const text = document.createElement("div");
  text.classList.add("floating-text");
  text.innerText = textMessage;
  document.body.appendChild(text);
  setTimeout(() => text.remove(), 5000);
}

// Broken Hearts fall animation
function createBrokenHearts() {
  for (let i = 0; i < 15; i++) {
    const heart = document.createElement("div");
    heart.classList.add("broken-heart");
    heart.innerHTML = "💔";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = Math.random() * 2 + 2 + "s";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3000);
  }
}
