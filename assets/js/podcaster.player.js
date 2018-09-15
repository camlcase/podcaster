/**
 * podcaster.player.js
 * @namespace podcaster
 * @description Podcaster HTML5 Audio Player module.
 * @version 1.0.0
 */
(function (podcaster) {

    podcaster.player = (function () {
        'use strict';

        var module = {}, 
            currentTrack = null, 
            audio, playlist, infoBox,
            messages = {
                noTracks: 'No tracks available ...'
            };

        function formatDate(dateStr) {
            var date = new Date(dateStr +'T00:00:00'),
                options = {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                };

            return date.toLocaleDateString('en-US', options);
        }
        function play(target) {
            currentTrack = target;
            audio.src = data.config.baseUrl + target.getAttribute('data-track-filename');
            audio.play();

            for (var i = 0; i < playlist.childNodes.length; i++) {
                playlist.childNodes[i].classList.remove('current');
            }
            target.classList.add('current');
        }
        function onPlaylistClick(e) {
            e.preventDefault();
            var target = (this.nodeName.toUpperCase() === 'LI') ? this : e.target;
            play(target);
        }
        function onTrackEnded() {
            var nextTrack = currentTrack.nextSibling;
            if (nextTrack) {
                play(nextTrack);
            }
        }
        function addTrack(track) {
            var timeFormatted = new Date(track.duration * 1000).toISOString().substr(11, 8);
            if (timeFormatted.startsWith('00:')) {
                timeFormatted = timeFormatted.substring(3, timeFormatted.length);
            }

            var li = document.createElement('li'),
                trackName = document.createTextNode(track.title),
                trackNameSpan = document.createElement('div'),
                timeSpan = document.createElement('div'),
                duration = document.createTextNode(formatDate(track.the_date) + ' | ' + timeFormatted),
                description = document.createTextNode(track.description),
                descriptionSpan = document.createElement('div'),
                author = document.createTextNode('Author: ' + track.author),
                authorSpan = document.createElement('div');

            li.setAttribute('data-track-filename', track.filename);
            timeSpan.setAttribute('class', 'time');
            descriptionSpan.setAttribute('class', 'info');
            authorSpan.setAttribute('class', 'author');
            trackNameSpan.setAttribute('class', 'name');

            timeSpan.appendChild(duration);
            descriptionSpan.appendChild(description);
            authorSpan.appendChild(author);
            trackNameSpan.appendChild(trackName);

            li.appendChild(trackNameSpan);
            if (description) {
                li.appendChild(descriptionSpan);
            }
            li.appendChild(authorSpan);
            li.appendChild(timeSpan);

            playlist.appendChild(li);
            
            li.addEventListener('click', onPlaylistClick, false);
        }
        function toggleInfoMess(text) {
            infoBox.textContent = text;
            if (infoBox.style.display === 'none') {
                infoBox.style.display = 'block';
            } else {
                infoBox.style.display = 'none';
            }
        }
        function populateTracks() {
            if (data.tracks.length > 0) {
                audio.src = data.config.baseUrl + data.tracks[0].filename;
                for (var i = 0; i < data.tracks.length; i++) {
                    addTrack(data.tracks[i]);
                }
            } else {
                toggleInfoMess(messages.noTracks);
            }
        }
        function bind() {
            audio.addEventListener('ended', onTrackEnded, false);
        }
        function polyfill() {//IE11 support
            if (!String.prototype.startsWith) {
                String.prototype.startsWith = function(search, pos) {
                    return this.substr(!pos || pos < 0 ? 0 : +pos, search.length) === search;
                };
            }
        }
        function setupPlayer() {
            var height = audio.offsetHeight + 51;
            playlist.style.height = 'calc(100vh - ' + height + 'px)';

            infoBox = document.createElement('div');
            infoBox.id = 'info-box';
            infoBox.style.display = 'none';
            playlist.appendChild(infoBox);
        }

        module.init = function () {
            audio = document.getElementById('audio');
            playlist = document.getElementById('playlist');

            polyfill();
            bind();
            setupPlayer();
            populateTracks();
        };

        return module;
    })();

    // Self init
    document.addEventListener('DOMContentLoaded', function () {
        podcaster.player.init();
    }, false);

}(window.podcaster = window.podcaster || {}));