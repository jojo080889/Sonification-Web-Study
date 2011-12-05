var mySound2, mySound3;
var aID = $.urlParam('assignmentId');
var chartType = $.urlParam('chartType');
var normalListened = false;
var highlightListened = false;

$(document).ready(function() {

	if (aID == "ASSIGNMENT_ID_NOT_AVAILABLE") {
		$("#previewWarning").css('display', 'block');
	}
	
	$("#nextTrial").bind('click', function() {
		var url = "practice.html?assignmentId=" + aID + "&chartType=" + chartType;
		window.location = url;
	});

	fillInQuestionText();
	
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
	});
});

