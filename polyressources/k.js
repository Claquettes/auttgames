const bg = document.getElementById("bg");

// Set initial class to add black and white filter
bg.classList.add("black-white");

// Animate the background to rotate hue infinitely
anime({
  targets: "#bg",
  duration: 10000,
  backgroundColor: ["#000", "#fff"],
  easing: "linear",
  direction: "alternate",
  loop: true,
});
