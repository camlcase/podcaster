<?php
if (!isset($_POST['title']) 
   || !isset($_POST['date']) 
   || !isset($_POST['author']) 
   || !isset($_POST['duration'])
   || !isset($_POST['file'])) {
   http_response_code(404);
}

include '../lib/config.php';
include '../lib/Cache.php';
include '../lib/DataAccess.php';

$title = $_POST['title'];
$date = $_POST['date'];
$author = $_POST['author'];
$duration = $_POST['duration'];
$filename = $_POST['file'];
$description = $_POST['description'];

DataAccess::addTrack($title, $date, $author, $duration, $filename, $description);