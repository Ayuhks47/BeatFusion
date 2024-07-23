const songs = [
    { id: 1, name: "Husn Tera Tauba Tauba", artist: "Karan Aujla", img: "images_1/img_1.jpg", genre: "pop", source: "songs_1/song1.mp3" },
    { id: 2, name: "Levitating", artist: "Dua Lipa", img: "images_1/img_2.jpeg", genre: "pop", source: "songs_1/song2.mp3" },
    { id: 3, name: "Shape Of You", artist: "Ed Sheeran", img: "images_1/img_3.jpeg", genre: "jazz", source: "songs_1/song3.mp3" },
    { id: 4, name: "Bon Apetit", artist: "Katy Perry", img: "images_1/img_4.jpeg", genre: "rock", source: "songs_1/song4.mp3" },
    { id: 5, name: "Cold Water", artist: "Justin Bieber", img: "images_1/img_5.jpeg", genre: "jazz", source: "songs_1/song5.mp3" },
    { id: 6, name: "Rise", artist: "Anonymous", img: "images_1/img_6.jpeg", genre: "jazz", source: "songs_1/song6.mp3" },
    { id: 7, name: "Stitches", artist: "Shawn Mandes", img: "images_1/img_7.jpeg", genre: "pop", source: "songs_1/song7.mp3" },
    { id: 8, name: "Blank Space", artist: "Taylor Swift", img: "images_1/img_8.jpeg", genre: "jazz", source: "songs_1/song8.mp3" },
    { id: 9, name: "Blinding Lights", artist: "Weekend", img: "images_1/img_9.jpeg", genre: "rock", source: "songs_1/song9.mp3" },
    { id: 10, name: "Dusk Till Dawn", artist: "Zayn Malik", img: "images_1/img_10.jpeg", genre: "pop", source: "songs_1/song10.mp3" },
    { id: 11, name: "Aasa Kooda", artist: "Sai Abayankar", img: "images_1/img_11.jpeg", genre: "classical", source: "songs_1/song11.mp3" },
    { id: 12, name: "The disco song", artist: "Sunidhi Chauhan", img: "images_1/img_12.jpeg", genre: "rock", source: "songs_1/song12.mp3" },
    { id: 13, name: "Khuda Jaane", artist: "KK", img: "images_1/img_13.jpeg", genre: "classical", source: "songs_1/song13.mp3" },
    { id: 14, name: "Tere Naina", artist: "Shankar-Ehsaan roy", img: "images_1/img_13.jpeg", genre: "classical", source: "songs_1/song14.mp3" },
];

const playlists = [];

const songListElement = document.getElementById('song-list');
const genreFilterElement = document.getElementById('genre-filter');
const songCardElement = document.getElementById('song-card');
const songImageElement = document.getElementById('song-image');
const songNameElement = document.getElementById('song-name');
const artistNameElement = document.getElementById('artist-name');
const audioPlayerElement = document.getElementById('audio-player');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const addToPlaylistBtn = document.getElementById('add-to-playlist-btn');
const playlistNameElement = document.getElementById('playlist-name');
const createPlaylistBtn = document.getElementById('create-playlist-btn');
const playlistListElement = document.getElementById('playlist-list');
const toggleThemeBtn = document.getElementById('toggle-theme-btn');

let currentSongIndex = 0;
let currentPlaylistIndex = -1;

function renderSongs(filter = 'all') {
    songListElement.innerHTML = '';
    const filteredSongs = filter === 'all' ? songs : songs.filter(song => song.genre === filter);
    filteredSongs.forEach(song => {
        const li = document.createElement('li');
        li.textContent = `${song.name} - ${song.artist}`;
        li.addEventListener('click', () => {
            playSong(song.id);
        });
        songListElement.appendChild(li);
    });
}

function playSong(id) {
    const song = songs.find(song => song.id === id);
    if (song) {
        currentSongIndex = songs.indexOf(song);
        songImageElement.src = song.img;
        songNameElement.textContent = song.name;
        artistNameElement.textContent = song.artist;
        audioPlayerElement.src = song.source;
        audioPlayerElement.play();
    }
}

prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    playSong(songs[currentSongIndex].id);
});

nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    playSong(songs[currentSongIndex].id);
});

addToPlaylistBtn.addEventListener('click', () => {
    if (currentPlaylistIndex === -1) {
        alert('Please select a playlist to add songs.');
        return;
    }
    const song = songs[currentSongIndex];
    const playlist = playlists[currentPlaylistIndex];
    if (playlist && playlist.songs.indexOf(song) === -1) {
        playlist.songs.push(song);
        renderPlaylist();
    }
});

createPlaylistBtn.addEventListener('click', () => {
    const playlistName = playlistNameElement.value;
    if (playlistName && !playlists.find(playlist => playlist.name === playlistName)) {
        playlists.push({ name: playlistName, songs: [] });
        renderPlaylists();
        playlistNameElement.value = ''; // Clear the input field
    }
});

function renderPlaylists() {
    playlistListElement.innerHTML = '';
    playlists.forEach((playlist, index) => {
        const li = document.createElement('li');
        li.textContent = playlist.name;
        li.addEventListener('click', () => {
            currentPlaylistIndex = index;
            renderPlaylist();
        });
        playlistListElement.appendChild(li);
    });
}

function renderPlaylist() {
    // Clear existing content
    songListElement.innerHTML = '';

    const playlist = playlists[currentPlaylistIndex];
    if (playlist) {
        playlist.songs.forEach(song => {
            const li = document.createElement('li');
            li.textContent = `${song.name} - ${song.artist}`;
            li.addEventListener('click', () => {
                playSong(song.id);
            });
            songListElement.appendChild(li);
        });
    }
}

genreFilterElement.addEventListener('change', () => {
    renderSongs(genreFilterElement.value);
});

toggleThemeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

renderSongs();
