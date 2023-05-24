
const audioPlayer = document.getElementById('audio-player');
const songTitle = document.getElementById('song-title');
const artistName = document.getElementById('artist-name');
const songDuration = document.getElementById('song-duration');


audioPlayer.addEventListener('loadedmetadata', () => {
  const duration = formatTime(audioPlayer.duration);
  songDuration.textContent = `Duration: ${duration}`;
});

audioPlayer.addEventListener('play', () => {
  const fileName = audioPlayer.currentSrc.split('/').pop();
  const title = fileName.substring(0, fileName.lastIndexOf('.'));
  songTitle.textContent = title;
  artistName.textContent = 'Artist Name'; // Replace with actual artist name
});

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  const formattedTime = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  return formattedTime;
}

function playSong(songPath) {
  audioPlayer.src = songPath;
  audioPlayer.play();
  console.log('Playing song...' + songPath);
}

function playU(){
  let path = "https://claq.fr/host/unity.mp3";
  console.log('Playing song...' + path);
  playSong(path);
}