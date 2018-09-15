<!doctype html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <title>Podcaster</title>

    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="assets/css/main.css?v=1.0.0">
</head>

<body>

    <div id="wrapper">
        <header>
            <h1>Podcaster</h1>
        </header>
        <div id="audio-player">
            <audio id="audio" preload="auto" tabindex="0" controls>
                Your browser doesn´t support the Podcaster (HTML5 audio element).
            </audio>
        </div>
        <ul id="playlist"></ul>
    </div>

<?php include 'playlist.inc.php'; ?>

<script src="assets/js/podcaster.player.js?v=1.0.0"></script>
</body>
</html>