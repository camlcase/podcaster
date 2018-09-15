<?php
include '../lib/config.php';
include '../lib/DataAccess.php';
header('Content-type: text/xml');

$feed = <<<XML
<?xml version="1.0" encoding="utf-8"?>
<rss xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
   <channel>
      <title>Podcaster</title>
      <description>The Podcaster.</description>
      <link>http://localhost/podcaster</link>
      <atom:link href="http://localhost/podcaster/feed" rel="self" type="application/rss+xml"/>
XML;

$playlist = DataAccess::getPlaylist();
$tracks = $playlist['tracks'];
for ($i = 0; $i < count($tracks); $i++) {
   $track = $tracks[$i];
   $title = $track['title'];
   $author = $track['author'];
   $link = 'http://localhost/podcaster/tracks/' . $track['filename'];
   $desc = $track['description'];
   $date = gmdate(DATE_RSS, strtotime($track['date']));
   $duration = $track['duration'];

   $feed .= PHP_EOL."<item>";
   $feed .= PHP_EOL."<title><![CDATA[$title]]></title>";
   if (!empty($desc)) {
   $feed .= PHP_EOL."<itunes:summary><![CDATA[$desc]]></itunes:summary>";
   $feed .= PHP_EOL."<description><![CDATA[$desc]]></description>";
   }
   $feed .= PHP_EOL."<link>$link</link>";
   $feed .= PHP_EOL."<enclosure url=\"$link\" type=\"audio/mpeg\" length=\"$duration\"></enclosure>";
   $feed .= PHP_EOL."<pubDate>$date</pubDate>";
   $feed .= PHP_EOL."<itunes:author><![CDATA[$author]]></itunes:author>";

   $feed .= PHP_EOL."<language>en</language>";
   $feed .= "<itunes:duration>".$track['duration']."</itunes:duration>";
   $feed .= PHP_EOL."<itunes:explicit>no</itunes:explicit>";

   $feed .= PHP_EOL."<guid>$link</guid>";
   $feed .= PHP_EOL."</item>";
}
$feed .= <<<XML
   </channel>
</rss>
XML;

$xml = new SimpleXMLElement($feed);
echo $xml->asXML();