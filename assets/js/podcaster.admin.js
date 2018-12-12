/**
 * podcaster.admin.js
 * @namespace podcaster
 * @description Podcaster admin module.
 * @version 1.0.1
 */
(function (podcaster, Dropzone) {

    podcaster.admin = (function () {
		'use strict';

		var module = {},
			current_fs, next_fs, previous_fs, 	// Fieldsets
			left, opacity, scale, 				// Fieldset properties which we will animate
			animating, 							// Flag to prevent quick multi-click glitches
			filename, 							// Holds the name of the uploaded file
			duration, 							// Holds the duration of the audio file
			postUrl = 'save-data.php',
			messages = {
				dropAudioFile: 'Drop your audio file here to upload, or click to select',
				invalidFileType: 'Only mp3-files can be uploaded',
				errorUploadAudio: 'An error occured!\nYou must upload an audio file.',
				errorServer: 'An error has occured! Please try again.',
				errorAllFields: 'An error occured!\nAll fields with * must be filled in.',
				errorSaving: 'Could not save. Please try again.'
            };

		function save(data) {
			$.post(postUrl, data)
			.done(function (response, textStatus, jqXHR) {
				next();
			})
			.fail(function (jqXHR, textStatus, errorThrown) {
				alert(messages.errorSaving);
			});
		}
		function onSubmitClick() {
			var data = {
				"title": $('input[name="title"]').val(),
				"date": $('input[name="date"]').val(),
				"author": $('input[name="author"]').val(),
				"duration": duration,
				"file": filename,
				"description": $('input[name="description"]').val()
			};
		
			// Validation
			if (!data.file) {
				return alert(messages.errorUploadAudio);
			} else if (!data.title || !data.date || !data.author || !data.duration) {
				return alert(messages.errorAllFields);
			}
		
			save(data);
		}
		function onCanPlayThrough(e) {
			duration = Math.floor(e.currentTarget.duration);
		}
		function next() {
			if (animating) return false;
			animating = true;
			
			current_fs = $('fieldset:visible');
			next_fs = current_fs.next();
			
			// Activate next step on progressbar
			$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
			
			next_fs.show(); 
		
			// Hide the current fieldset
			current_fs.animate({opacity: 0}, {
				step: function(now, mx) {
					// as the opacity of current_fs reduces to 0 - stored in "now"
					// 1. scale current_fs down to 80%
					scale = 1 - (1 - now) * 0.2;
					// 2. bring next_fs from the right(50%)
					left = (now * 50)+"%";
					// 3. increase opacity of next_fs to 1 as it moves in
					opacity = 1 - now;
					current_fs.css({
				'transform': 'scale('+scale+')',
				'position': 'absolute'
				  });
					next_fs.css({'left': left, 'opacity': opacity});
				}, 
				duration: 800, 
				complete: function(){
					current_fs.hide();
					animating = false;
				}, 
				// this comes from the custom easing plugin
				easing: 'easeInOutBack'
			});
		}
		function prev() {
			if (animating) return false;
			animating = true;
			
			current_fs = $('fieldset:visible');//self.parent();
			previous_fs = current_fs.prev();//self.parent().prev();
			
			//de-activate current step on progressbar
			$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
			
			//show the previous fieldset
			previous_fs.show(); 
			//hide the current fieldset with style
			current_fs.animate({opacity: 0}, {
				step: function(now, mx) {
					//as the opacity of current_fs reduces to 0 - stored in "now"
					//1. scale previous_fs from 80% to 100%
					scale = 0.8 + (1 - now) * 0.2;
					//2. take current_fs to the right(50%) - from 0%
					left = ((1-now) * 50)+"%";
					//3. increase opacity of previous_fs to 1 as it moves in
					opacity = 1 - now;
					current_fs.css({'left': left});
					previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
				}, 
				duration: 800, 
				complete: function(){
					current_fs.hide();
					animating = false;
				}, 
				//this comes from the custom easing plugin
				easing: 'easeInOutBack'
			});
		}
		function bind() {
			$('.next').click(next);
			$('.previous').click(prev);
			$('.submit').click(onSubmitClick);
			$('#audio').on('canplaythrough', onCanPlayThrough);
			$('#date').datetimepicker({
				format: 'YYYY-MM-DD'
			});
		}

		Dropzone.options.myDropzone = {
			url: 'upload-file.php',
			acceptedFiles: '.mp3',
			dictDefaultMessage: messages.dropAudioFile,
			dictInvalidFileType: messages.invalidFileType,
			success: function (file, response, e) {		
				filename = file.name;
				$('.next').prop('disabled', false);
			},
			error: function (file, message, xhr) {
				alert(messages.errorServer);
			}
		};

        module.init = function () {
			bind();
        };

        return module;
    })();

    // Self init
    document.addEventListener('DOMContentLoaded', function () {
        podcaster.admin.init();
    }, false);

}(window.podcaster = window.podcaster || {}, Dropzone));