$(document).ready(function() {
	var aID = $.urlParam('assignmentId');
	var chartType = $.urlParam('chartType');

	if (aID == "ASSIGNMENT_ID_NOT_AVAILABLE") {
		$("#previewWarning").css('display', 'block');
	}
	
	$("#nextTrial").bind('click', function() {
		var validAnswers = validateCalibration();
		if (validAnswers) {
			var url = "training.html?assignmentId=" + aID + "&chartType=" + chartType;
			window.location = url;
		}
	});
	
	// set up sound stuff
	soundManager.onready(function() {
		mySoundID = 'calibration';
		mySound = soundManager.createSound({
			id: mySoundID,
			url: 'sounds/calibration.mp3',
			autoLoad: true,
			onload: function() {
				$("#loading").hide();
				$("#soundcontent").show();
				$("#total_duration").html(getTime(this.duration));
				$("#time_pos").html("0:00");
			}
		});

		bindPlayLink("#soundclip", mySound);
		//bindPauseLink("#soundclip", mySound);
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