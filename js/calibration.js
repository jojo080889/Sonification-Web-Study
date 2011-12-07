$(document).ready(function() {
	var aID = $.urlParam('assignmentId');
	var workerID = $.urlParam('workerId');
	var chartType = $.urlParam('chartType');

	if (aID == "ASSIGNMENT_ID_NOT_AVAILABLE") {
		$("#previewWarning").css('display', 'block');
	}

	$("#calibrationAnswer").bind('keyup', function() {
		if ($.trim($("#calibrationAnswer").val()) != "") {
			$("#nextTrial").removeAttr("disabled");
		} else {
			$("#nextTrial").attr("disabled", "disabled");
		}
	});

	$("#nextTrial").bind('click', function() {
		var validAnswers = validateCalibration();
		if (validAnswers) {
			$("#mturk_form").submit();
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
			}
		});

		bindPlayLink("#soundclip", mySound);
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
