<?php
function isValidExtension($filename) {
    $info = pathinfo($filename);
    return $info['extension'] == 'mp3';
}

if (!empty($_FILES) && isValidExtension($_FILES['file']['name'])) {
   $ds = DIRECTORY_SEPARATOR;
   $storeFolder = "..{$ds}tracks";;

   $tempFile = $_FILES['file']['tmp_name'];
   $targetPath = dirname( __FILE__ ) . $ds . $storeFolder . $ds;
   $targetFile =  $targetPath . uniqid() . '.mp3';

   move_uploaded_file($tempFile, $targetFile);

   http_response_code(200);
} else {
    http_response_code(500);
}