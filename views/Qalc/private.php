
<?php require 'php/functions.php' ?> <!-- We import the functions.php file -->

<!DOCTYPE html>
<html>
<head>
    <title>Responsive Music Player</title>
    <link rel="stylesheet" type="text/css" href="css/style.css">
</head>
<body>
    <div class="music-player">
        <div class="song-meta">
            <h2 id="song-title"></h2>
            <p id="artist-name"></p>
            <p id="song-duration"></p>
        </div>
        <audio id="audio-player" controls autoplay>
            <source src="my_music/surf.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
    </div>
    <div id="library"> <!-- This is where we display the audios you obtained a copy legally -->
        <label id="library-top-text"> The music you legally own: </label>
    <?php 
      $songs = getSongs();
      foreach ($songs as $song) {
        echo '<div class="song" onclick="playSong(\'' . $song['path'] . '\')"> 
        <ul>
          <li class="song-index">' . $song['index'] . '</li>
          <li class="song-title">' . $song['title'] . '</li>
          <li class="song-artist">' . $song['artist'] . '</li>
        </ul>
        </div>';
      }
    ?>
        
    </div>
    <div class="meme" onclick="playU()">
        <img src="https://i.pinimg.com/originals/82/11/48/8211481bd2b14b7aa7ce208b2378cdfb.png" alt="garfield">
    </div>
    
    <script src="js/script.js"></script> 
</body>
</html>
