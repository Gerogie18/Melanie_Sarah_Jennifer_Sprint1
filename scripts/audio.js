const audioElement = document.getElementById("audioElement");
const playButton = document.getElementById("playButton");

playButton.addEventListener("click", () => {
  audioElement.play().catch((error) => {
    console.error("Error playing audio:", error);
  });
});
