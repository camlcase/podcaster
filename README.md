# Podcaster
Podcaster is an HTML5 audio player with playlist and admin interface.

## Usage
Place the whole project in a PHP-enabled server folder of your choice. Use the _DB/podcaster.sql to generate the database table needed. Goto lib/config.php to adjust the database configuration to match your environment.

The audio tracks will be stored inside the tracks folder.

The playlist cache data file will be stored inside the cache folder.

Podcaster runs on the PHP 7.x platform, but has also been tested with PHP 5.6.35. Uses MariaDB or MySQL as data storage.

## Features
### Audio Player
The player uses [the embed audio element]("https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio"), which is controlled by the  **camlcase.player** javascript module. The player interface is left as rendered by each browser. _See Browser Support below._

### Playlist
The playlist is generated in a plain list using a MySQL/MariaDB data source. There is also a caching mechanism which stores a json representation, physical on disk inside the cache project folder. The cache will be restored when a new audio file is added to the podcaster using the admin interface. _See Admin below._

### Feed
Inside the feed project folder you´ll find a podcast feed. This will render the playlist as an standard Atom feed which makes it possible for users to subscribe to your podcaster playlist.

### Admin
Inside the admin project folder you´ll find an interface to upload a new mp3 audio file and save it along with audio information which will be shown in playlist.

At the moment the admin interface only allows audio tracks to be added. Tracks can not be updated or deleted afterwards, unless directly in database. This will be added in a future version.

Note: There are no login mechanism for the admin interface. Personally I´ve been placing the admin folder on an unguessable server path. This was good enough.

## Browser Support
The Podcaster has been tested with Chrome 69, Firefox 62, Edge 42 and Internet Explorer 11. Has also been tested on various of mobile devices.

## Third Party Software
The following third party softwares has been used.
* [Bootstrap 3 Datepicker]("https://eonasdan.github.io/bootstrap-datetimepicker/")
* [Dropzone]("https://www.dropzonejs.com/")
* [Moment]("https://momentjs.com/")

## Contact
Please feel free to [contact me]("https://martincarlsen.com").