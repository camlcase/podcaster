<?php
include '../lib/config.php';
include '../lib/Cache.php';
include '../lib/DataAccess.php';

$data = Cache::get('playlist');

if (!isset($data) || strlen($data) == 0) {
   $playlist = DataAccess::getPlaylist();
   $data = json_encode($playlist);
   Cache::insert('playlist', $data);
}

header('Content-Type: application/json');
echo $data;