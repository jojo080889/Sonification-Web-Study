var mySound2, mySound3, mySound4, mySound5, mySound6;
var aID = $.urlParam('assignmentId');
var chartType = $.urlParam('chartType');
var normalListened = false;
var highlightListened = false;

$(document).ready(function() {

	if (aID == "ASSIGNMENT_ID_NOT_AVAILABLE") {
		$("#previewWarning").css('display', 'block');
	}
	
	$("#nextTrial").bind('click', function() {
		$("#mturk_form").submit();
	});

	fillInQuestionText();

	if (chartType == "pitch") { $("#pitch_instructions").show(); }

	// set up sound stuff
	soundManager.onready(function() {
		mySound = soundManager.createSound({
			id: 'nohighlight',
			url: 'sounds/' + chartType + '/nohighlightbeep.mp3',
			autoLoad: true,
			onload: function() {
				$("#soundclip_normal #loading").hide();
				$("#soundclip_normal #soundcontent").show();
				$("#soundclip_normal #total_duration").html(getTime(this.duration));
				$("#soundclip_normal #time_pos").html("0:00");
			}
		});
		mySound2 = soundManager.createSound({
			id: 'highlight',
			url: 'sounds/' + chartType + '/highlightbeep.mp3',
			autoLoad: true,
			onload: function() {
				$("#soundclip_highlight #loading").hide();
				$("#soundclip_highlight #soundcontent").show();
				$("#soundclip_highlight #total_duration").html(getTime(this.duration));
				$("#soundclip_highlight #time_pos").html("0:00");
			}
		});
	
		bindPlayLink("#soundclip_normal", mySound);
		bindPlayLink("#soundclip_highlight", mySound2);

		if (chartType == "pitch") {
			mySound3 = soundManager.createSound({
				id: 'pitch_silence',
				url: 'sounds/pitch/practice1.mp3',
				autoLoad: true,
				onload: function() {
					$("#soundclip_pitch_silence #loading").hide();
					$("#soundclip_pitch_silence #soundcontent").show();
				}
			});
			mySound4 = soundManager.createSound({
				id: 'pitch_transition',
				url: 'sounds/pitch/practice3.mp3',
				autoLoad: true,
				onload: function() {
					$("#soundclip_pitch_transitions #loading").hide();
					$("#soundclip_pitch_transitions #soundcontent").show();
				}
			});
			bindPlayLink("#soundclip_pitch_silence", mySound3);
			bindPlayLink("#soundclip_pitch_transitions", mySound4);
		} else if (chartType == "duration") {
			mySound5 = soundManager.createSound({
				id: 'duration_single',
				url: 'sounds/duration/practice1.mp3',
				autoLoad: true,
				onload: function() {
					$("#soundclip_duration_single #loading").hide();
					$("#soundclip_duration_single #soundcontent").show();
				}
			});
			mySound6 = soundManager.createSound({
				id: 'duration_two',
				url: 'sounds/duration/practice3.mp3',
				autoLoad: true,
				onload: function() {
					$("#soundclip_duration_two #loading").hide();
					$("#soundclip_duration_two #soundcontent").show();
				}
			});
			bindPlayLink("#soundclip_duration_single", mySound5);
			bindPlayLink("#soundclip_duration_two", mySound6);
		}
	});
});

