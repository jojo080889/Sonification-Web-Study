var mySound2, mySound3;

$(document).ready(function() {
	var aID = $.urlParam('assignmentId');
	var chartType = $.urlParam('chartType');

	if (aID == "ASSIGNMENT_ID_NOT_AVAILABLE") {
		$("#previewWarning").css('display', 'block');
	}
	
	$("#nextTrial").bind('click', function() {
		var url = "practice.html?assignmentId=" + aID + "&chartType=" + chartType;
		window.location = url;
	});
	
	// set up sound stuff
	soundManager.onready(function() {
		mySound = soundManager.createSound({
			id: 'nohighlight',
			url: 'sounds/nohighlightbeep.mp3',
			autoLoad: true,
			onload: function() {
				$("#soundclip_normal #loading").hide();
				$("#soundclip_normal #soundcontent").show();
				$("#soundclip_normal #total_duration").html(getTime(this.duration));
				$("#soundclip_normal #time_pos").html("0:00");
			}
		});
		mySound2 = soundManager.createSound({
			id: 'overtone',
			url: 'sounds/overtonehighlightbeep.mp3',
			autoLoad: true,
			onload: function() {
				$("#soundclip_overtone #loading").hide();
				$("#soundclip_overtone #soundcontent").show();
				$("#soundclip_overtone #total_duration").html(getTime(this.duration));
				$("#soundclip_overtone #time_pos").html("0:00");
			}
		});
		mySound3 = soundManager.createSound({
			id: 'noise',
			url: 'sounds/noisehighlightbeep.mp3',
			autoLoad: true,
			onload: function() {
				$("#soundclip_noise #loading").hide();
				$("#soundclip_noise #soundcontent").show();
				$("#soundclip_noise #total_duration").html(getTime(this.duration));
				$("#soundclip_noise #time_pos").html("0:00");
			}
		});
	
		bindPlayLink("#soundclip_normal", mySound);
		bindPlayLink("#soundclip_overtone", mySound2);
		bindPlayLink("#soundclip_noise", mySound3);
	});
});

function validateCalibration() {
	// make sure user enters the right number
	var ans = $("#calibrationAnswer").val();
	if ($.trim(ans) == "") {
		alert("Please enter an answer!");
		return false;
	} else if (ans != 5) { // hard coded answer
		alert("That is not correct. Please try again.");
		return false;
	} else {
		return true;
	}
}
