<?php
include 'lib/config.php';
include 'lib/Cache.php';
include 'lib/DataAccess.php';

$data = Cache::get('playlist');

if (!isset($data) || strlen($data) == 0) {
   $playlist = DataAccess::getPlaylist();
   $data = '<script>var data = ' . json_encode($playlist) . '</script>';
   Cache::insert('playlist', $data);
}

echo $data;