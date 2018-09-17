/**
 * podcaster.player.js
 * @namespace podcaster
 * @description Podcaster HTML5 Audio Player module.
 * @version 1.1.0
 */
(function (podcaster) {

    podcaster.player = (function () {
        'use strict';

        var module = {}, 
            currentTrack = null, 
            audio, playlist, infoBox, trackBasePath,
            messages = {
                noTracks: 'Playlist could not be loaded ...',
                loading: 'Loading ...'
            };

        function getJSON(url, callback) {
            var req = new XMLHttpRequest();
            req.onreadystatechange = function () {
                if (req.readyState === XMLHttpRequest.DONE) {
                    if (req.status === 200 && callback) {
                        callback(JSON.parse(req.responseText));
                    }
                }
            }
            req.open('GET', url, true);
            req.send(null);
        }
        function renderTemplate(id, obj) {
            var regex = /{{(.*?)}}/igm,
            match,
            tmpl = document.getElementById(id),
            html = '',
            m0, m1;
            tmpl = (tmpl !== null) ? tmpl.innerHTML : id;

            function assemle(o) {
                var html = tmpl;

                while (match = regex.exec(html)) {
                    m0 = match[0];//{{title}} or {{date.ymd}}
                    m1 = match[1];//title or date.ymd

                    if (o.hasOwnProperty(m1)) {
                        html = html.replace(m0, o[m1]);
                    } else if (m1.indexOf('.') != -1) {
                        try {
                            html = html.replace(m0, new Function('obj', 'return obj.' + m1)(o));
                        } catch (ex) {
                            html = html.replace(m0, '');
                        }
                    }
                }
                return html;
            }

            if (obj && !obj.length) {
                html = assemle(obj);
            } else {
                for (var i = 0, len = obj.length; i < len; i++) {
                    html += assemle(obj[i]);
                }
            }
            return html;
        }
        function renderPlaylist() {
            getJSON('services/playlist.php', function (data) {
                if (!data || !data.tracks || data.tracks.length === 0) {
                    return showMessage(messages.noTracks);
                }
                trackBasePath = data.config.baseUrl;
                audio.src = trackBasePath + data.tracks[0].filename;
                playlist.innerHTML = renderTemplate('template', data.tracks);

                var tracks = document.querySelectorAll('#playlist li');
                for (var i = 0; i < tracks.length; i++) {
                    tracks[i].addEventListener('click', onPlaylistClick, false);
                }
            });
        }
        function play(target) {
            currentTrack = (target.nodeName === '#text') ? target.nextSibling : target;
            if (currentTrack === null) {
                return;
            }

            audio.src = trackBasePath + currentTrack.getAttribute('data-track-filename');
            audio.play();
            for (var i = 0; i < playlist.childNodes.length; i++) {
                var node = playlist.childNodes[i];
                if (node.nodeName !== '#text') {
                    node.classList.remove('current');
                }
            }
            currentTrack.classList.add('current');
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
        function showMessage(text) {
            infoBox.textContent = text;
            infoBox.style.display = 'block';
        }
        function bind() {
            audio.addEventListener('ended', onTrackEnded, false);
        }
        function setupPlayer() {
            var height = audio.offsetHeight + 51;
            playlist.style.height = 'calc(100vh - ' + height + 'px)';

            infoBox = document.createElement('div');
            infoBox.textContent = messages.loading;
            infoBox.id = 'info-box';
            infoBox.style.display = 'block';
            playlist.appendChild(infoBox);
        }

        module.init = function () {
            audio = document.getElementById('audio');
            playlist = document.getElementById('playlist');
            bind();
            setupPlayer();
            renderPlaylist();
        };

        return module;
    })();

    // Self init
    document.addEventListener('DOMContentLoaded', function () {
        podcaster.player.init();
    }, false);

}(window.podcaster = window.podcaster || {}));