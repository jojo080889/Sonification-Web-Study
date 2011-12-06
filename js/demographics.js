// get values from url string
var aID = $.urlParam("assignmentId");

$(document).ready(function() {
	if (aID == "ASSIGNMENT_ID_NOT_AVAILABLE") {
		$("#nextTrial").attr('disabled', 'disabled');
		$("#nextTrial").html("You must ACCEPT the HIT before you can submit the results.");
	}

	$("#nextTrial").bind('click', function() {	
		var validAnswers = validateDemographics();
		if (!validAnswers) { return false; }
		
		// Save demographics info
		var demographicsArray = [];
		var checked = $("input:checked");
		for (var i = 0; i < checked.length; i++) {
			demographicsArray.push(checked[i].value);
		}
		var ageAnswer = $.trim($("#ageAnswer").val());
		demographicsArray.push(ageAnswer);
		
		$("#demographics").val(demographicsArray);
		$("#mturk_form").submit();
	});
});

function validateDemographics() {
	var checked = $("input:checked");
	var ageAnswer = $.trim($("#ageAnswer").val());
	if (checked.length != 4 || ageAnswer == "") {
		alert("Please answer all the questions!");
		return false;
	}
	if (ageAnswer != parseInt(ageAnswer)) {
		alert("Your age must be a whole number.");
		return false;
	} else if (parseInt(ageAnswer) <= 0) {
		alert("Your age must be greater than 0.");
		return false;
	}
	return true;
}
