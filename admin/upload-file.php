<?php
if (!empty($_FILES)) {
   $ds = DIRECTORY_SEPARATOR;
   $storeFolder = "..{$ds}tracks";;

   $tempFile = $_FILES['file']['tmp_name'];
   $targetPath = dirname( __FILE__ ) . $ds . $storeFolder . $ds;
   $targetFile =  $targetPath . $_FILES['file']['name'];

   move_uploaded_file($tempFile, $targetFile);

   echo 'success';
} else {
   echo 'fail';
}