var experiment;
var chartType;
var aID;
var trialCount = 2; // CHANGE THIS TO 24
var baseTime;
var trialPos;

$(document).ready(function() {
	// get values from url string
	chartType = $.urlParam("chartType");
	aID = $.urlParam("assignmentId");
	
	// create experiment object
	experiment = new SonificationExperiment(chartType, trialCount);
	
	// fill in hidden form and assign click events
	$("#assignmentId").val(aID);
	$("#chartType").val(chartType);
	$("#nextTrial").bind('click', loadNextTrial);
	
	// show preview warning if needed
	if (aID == "ASSIGNMENT_ID_NOT_AVAILABLE") {
		$("#previewWarning").css('display', 'block');
	}
	
	// populate play count information
	$("#maxPlayCount").html(experiment.getPlayLimit());
	$("#playsLeft").html(experiment.getPlayLimit());
	
	// set up soundmanager
	// set up sound stuff
	mySoundID = 'practice';
	soundManager.onready(function() {
		mySound = soundManager.createSound({
			id: mySoundID,
			url: 'sounds/practice.mp3',
			autoLoad: true,
			onload: function() {
				$("#loading").hide();
				$("#soundcontent").show();
				$("#total_duration").html(getTime(this.duration));
				$("#time_pos").html("0:00");
			}
		});
		
		bindExperimentPlayLink();
	});
	
	// To keep track of how long it takes the participant to answer
	baseTime = new Date().getTime();
});

function loadNextTrial() {	
	if (trialPos != "demographics") {
		trialPos = experiment.getTrialPos();
	}
	var validAnswers;
	
	// if it's the practice question, make sure the participant was correct
	// before allowing them to continue
	if (trialPos == -1) {
		validAnswers = validatePractice();
		if (!validAnswers) { return false; }
	} else if (trialPos != "demographics") {
		// on the normal questions, make sure participants fill out the questions
		validAnswers = validateAnswers();
		if (!validAnswers) { return false; }
	} else { // demographics
		validAnswers = validateDemographics();
		if (!validAnswers) { return false; }
	}
	
	// Save participant answers (if not the practice)
	if ((trialPos != -1) && (trialPos != experiment.END_OF_TRIALS) && (trialPos != "demographics")) {
		// save answers
		var answerArray = []; // don't need to save trialPos, since that = index of answer arrays
		answerArray.push(experiment.getCurrentTrial());
		answerArray.push($("#toneA").val());
		answerArray.push($("#toneB").val());
		answerArray.push($("#shorterTone").val());
		answerArray.push($("#percentAnswer").val());
		experiment.saveTrialAnswer(trialPos, answerArray);
		
		// record how long it took for the participant to answer
		var nowTime = new Date().getTime();
		experiment.saveTiming(trialPos, nowTime - baseTime); // in milliseconds
		
		// record number of plays it took for the participant to answer
		var playsLeft = $("#playsLeft").html();
		experiment.savePlayCount(trialPos, experiment.getPlayLimit() - playsLeft);
	} else if (trialPos == "demographics") {
		// Save demographics info
		var demographicsArray = [];
		var checked = $("input:checked");
		for (var i = 0; i < checked.length; i++) {
			demographicsArray.push(checked[i].value);
		}
		var ageAnswer = $.trim($("#ageAnswer").val());
		demographicsArray.push(ageAnswer);
		experiment.saveDemographics(demographicsArray);
	}
	
	var nextTrial = experiment.getNextTrial();
	if (trialPos != "demographics") {
		trialPos = experiment.getTrialPos();
	}
	if (trialPos != experiment.END_OF_TRIALS && trialPos != "demographics") {
		var nextTrialURL = "sounds/" + nextTrial + ".mp3";
		
		// reset sound player
		soundManager.destroySound(mySoundID);
		mySoundID = nextTrial;
		mySound = soundManager.createSound({
			id: mySoundID,
			url: nextTrialURL,
			autoLoad: true,
			onload: function() {
				$("#loading").hide();
				$("#soundcontent").show();
				$("#total_duration").html(getTime(this.duration));
				$("#time_pos").html("0:00");
			}
		});
		$("#soundclip").unbind();
		bindExperimentPlayLink();
		$("#soundclip").removeClass('clipDisabled');
		$("#soundclip").removeClass('clipPlaying');
		$("#playsLeft").html(experiment.getPlayLimit());
		
		// replace content
		$("#question_header").html("Question " + (trialPos + 1) + " out of " + trialCount);
		$("#questions").html(content[chartType].questions);
		
		// reset baseTime
		baseTime = new Date().getTime();
	} else if (trialPos == experiment.END_OF_TRIALS) { // last trial
		if (aID == "ASSIGNMENT_ID_NOT_AVAILABLE") {
			$("#nextTrial").attr('disabled', 'disabled');
			$("#nextTrial").html("You must ACCEPT the HIT before you can submit the results.");
		} else {
			$("#nextTrial").html("Submit");
		}
		// Replace with demographics content
		$("#question_header").html("Almost done!");
		$("#description").html(content['demographics'].description);
		$("#questions").html(content['demographics'].questions);
		$("#soundclip").hide();
		$("#playInfo").hide();
		
		trialPos = "demographics";
	} else { // demographics
		// Populate hidden form and submit it
		$("#answerData").val(experiment.getTrialAnswers());
		$("#timingData").val(experiment.getTimingData());
		$("#playcountData").val(experiment.getPlayCountData());
		$("#demographics").val(experiment.getDemographics());
		$("#mturk_form").submit();
	}
};

function validatePractice() {
	// make sure user enters the right answers
	var toneA = $("#toneA").val();
	var toneB = $("#toneB").val();
	var shorterTone = $("#shorterTone").val();
	var practiceAnswer = $("input[@name=practiceAnswer]:checked").val();
	if (practiceAnswer == undefined) {
		alert("Please answer all the questions!");
		return false;
	} else if ((practiceAnswer != 46) || (toneA != 1) || (toneB != 3) || (shorterTone != "A")) { // TODO change these hard coded answers
		alert("Some of your answers are not correct. Make sure you understand the instructions and try again.");
		return false;
	}
	return true;
}

function validateAnswers() {
	// make sure user enters a number for the percentage answer
	var percentAnswer = $("#percentAnswer").val();
	if ($.trim(percentAnswer) == "") {
		alert("Please answer all the questions!");
		return false;
	} else if (percentAnswer != parseInt(percentAnswer)) {
		alert("The percent you entered must be a whole number.");
		return false;
	}
	return true;
}

function validateDemographics() {
	var checked = $("input:checked");
	var ageAnswer = $.trim($("#ageAnswer").val());
	if (checked.length != 5 || ageAnswer == "") {
		alert("Please answer all the questions!");
		return false;
	}
	return true;
}
