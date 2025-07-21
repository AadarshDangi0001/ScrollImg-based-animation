gsap.registerPlugin(ScrollTrigger);

const canvas = document.querySelector("#frame");
const context = canvas.getContext("2d");

const frames = {
  currentIndex: 0,
  maxIndex: 516, // Total = 517 images (0 to 516)
};

const images = [];
let imagesLoaded = 0;

function preloadImages() {
  for (let i = 1; i <= frames.maxIndex; i++) {
    const img = new Image();
    img.src = `./Prime-master/frame_${i.toString().padStart(4, "0")}.jpeg`;
    img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === frames.maxIndex ) {
        loadImage(frames.currentIndex);
        playScrollAnimation();
      }
    };
    images.push(img);
  }
}

function loadImage(index) {
  const img = images[index];
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const scaleX = canvas.width / img.width;
  const scaleY = canvas.height / img.height;
  const scale = Math.max(scaleX, scaleY);

  const newWidth = img.width * scale;
  const newHeight = img.height * scale;
  const offsetX = (canvas.width - newWidth) / 2;
  const offsetY = (canvas.height - newHeight) / 2;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(img, offsetX, offsetY, newWidth, newHeight);
}

function playScrollAnimation() {
  gsap.to(frames, {
    currentIndex: frames.maxIndex,
    ease: "none",
    scrollTrigger: {
      trigger: ".parent",
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
    },
    onUpdate: () => {
      loadImage(Math.floor(frames.currentIndex));
    },
  });
}

preloadImages();
