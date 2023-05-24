<?php 
function getSongs() { // This function returns an array of songs present in the my_music folder
      $songsDirectory = 'my_music/';
      $songs = [];
      $index = 0;
      $mp3Files = glob($songsDirectory . '*.mp3');
      foreach ($mp3Files as $file) {
        $title = basename($file, '.mp3');
        $artist = 'Artist Name'; // Replace with actual artist name
        $path = $file;
        $index++;
        $songs[] = [
          'title' => $title,
          'artist' => $artist,
          'path' => $path,
          'index' => $index
        ]; 
      }
      return $songs;
}
?>