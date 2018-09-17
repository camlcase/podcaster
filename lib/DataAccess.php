<?php
class DataAccess {
   public static function getPlaylist() {
      try {
         $dbh = new PDO(DB_DSN, DB_USERNAME, DB_PASSWORD, array(
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"
         ));
         
         $stmt = $dbh->prepare("SELECT 
            `title`, 
            DATE_FORMAT(date, '%d %b, %Y') as the_date, 
            TIME_FORMAT(SEC_TO_TIME(duration),'%i:%s') as the_duration,
            `author`, `filename`, `description` 
            FROM `podcaster` ORDER BY `date` DESC");
         $stmt->execute();
      
         $result = $stmt->fetchAll();

         $dbh = null;
      
         $obj = array(
            'config' => array(
               'baseUrl' => 'tracks/'
            ),
            'tracks' => $result
         );

         return $obj;
      } catch(PDOException $e) {
         die('Playlist could not be loaded.');
      }
   }

   public static function addTrack($title, $date, $author, $duration, $filename, $description) {
      try {
        $dbh = new PDO(DB_DSN, DB_USERNAME, DB_PASSWORD, array(
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'utf8'"
         ));
         
         $stmt = $dbh->prepare("INSERT INTO podcaster (`title`, `date`, `author`, `duration`, `filename`, `description`) 
            VALUES (:title, :date, :author, :duration, :filename, :description)");
      
         $stmt->execute(array(
            'title' => $title,
            'date' => $date,
            'author' => $author,
            'duration' => $duration,
            'filename' => $filename,
            'description' => $description
         ));
      
         $dbh = null;
      
         Cache::remove('playlist');
      
         http_response_code(200);
      } catch(PDOException $e) {
         die('Error when adding audio track.');
      }
   }
}