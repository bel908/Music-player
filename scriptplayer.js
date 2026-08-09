const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const progress = document.getElementById("progress");
const duration = document.getElementById("duration");
const volume = document.getElementById("volume");
const title = document.getElementById("title");
const artist = document.getElementById("artist");

// Playlist
const songs = [
  { src: "music/Fading Days.mp3", title: "Fading Days", artist: "Unknown",img: "images/fading days.jpg" },
  { src: "music/Hold the Thread.mp3", title: "Hold the Thread", artist: "Unknown",img: "images/hold the thread.jpg"},
  { src: "music/Birds of a feather.flac", title: "Birds of a feather", artist: "Billie Eilish", img: "images/billie eilish.webp "},
  { src: "music/Company.mp3", title: "Company", artist: "Justin Bieber", img :"images/justin bieber.webp"},
  { src: "music/Love Yourself.mp3", title: "Love Yourself", artist: "Justin Bieber", img :"images/justin bieber2.jpg" },
  { src: "music/Timeless.flac", title: "Timeless", artist: "The weekend", img :"images/the weekend.jpg" },
  { src: "music/Chicago.mp3", title: "Chicago", artist: "Micheal Jackson", img :"images/michael jackson.jpg"},
  { src: "music/Mirrors.flac", title: "Mirrors ", artist: "Justin Timberlake", img: "images/justin timberlake.avif" }
];

let currentSong = 0;

// Load song
function loadSong(index) {
  audio.src = songs[index].src;
  title.textContent = songs[index].title;
  artist.textContent = songs[index].artist;
}
loadSong(currentSong);

// Play
playBtn.addEventListener("click", () => audio.play());

// Pause
pauseBtn.addEventListener("click", () => audio.pause());

// Next
nextBtn.addEventListener("click", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
});

// Previous
prevBtn.addEventListener("click", () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
});

// Progress bar update
audio.addEventListener("timeupdate", () => {
  progress.value = (audio.currentTime / audio.duration) * 100 || 0;
  duration.textContent = formatTime(audio.currentTime);
});

// Seek
progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume control
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Format time
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

// For the next to start automatically
audio.addEventListener("ended", () => {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
});

audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100 || 0;
  progress.value = percent;

  // Update background fill
  progress.style.background = `linear-gradient(to right, #6a11cb ${percent}%, #444 ${percent}%)`;

  duration.textContent = formatTime(audio.currentTime);
});

volume.addEventListener("input", () => {
  audio.volume = volume.value;

  const percent = volume.value * 100;
  volume.style.background = `linear-gradient(to right, #2575fc ${percent}%, #444 ${percent}%)`;
});


const songList = document.getElementById("songList");

function renderPlaylist() {
  songList.innerHTML = "";
  songs.forEach((song, index) => {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.src = song.img;
    img.alt = song.artist;

    const text = document.createElement("span");
    text.textContent = `${song.title} - ${song.artist}`;

    li.appendChild(img);
    li.appendChild(text);

    if (index === currentSong) li.classList.add("active");

    li.addEventListener("click", () => {
      currentSong = index;
      loadSong(currentSong);
      audio.play();
      renderPlaylist();
    });

    songList.appendChild(li);
  });
}

renderPlaylist();

