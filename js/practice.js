var experiment;
var chartType;
var aID;
var trialCount = 3; // CHANGE THIS TO 3
var trialPos;
var nextTrial;

$(document).ready(function() {
	// get values from url string
	chartType = $.urlParam("chartType");
	aID = $.urlParam("assignmentId");
	
	// create practice experiment object
	experiment = new SonificationExperiment(chartType, trialCount);
	
	// assign click events
	$("#nextTrial").bind('click', loadPracticePartB);

	// show preview warning if needed
	if (aID == "ASSIGNMENT_ID_NOT_AVAILABLE") {
		$("#previewWarning").css('display', 'block');
	}
	
	// populate play count information
	$("#maxPlayCount").html(experiment.getPlayLimit());
	$("#playsLeft").html(experiment.getPlayLimit());

	nextTrial = experiment.getNextTrial();

	// load answer choices for first trial
	loadPracticePercentageChoices(nextTrial);

	// load question header and instructions
	trialPos = experiment.getTrialPos();
	$("#question_header").html("Practice Question " + (trialPos + 1) + "A out of " + trialCount);
	$("#description").html(content["instructions"].partA);

	// set up soundmanager
	mySoundID = 'practice' + nextTrial;
	soundManager.onready(function() {
		mySound = soundManager.createSound({
			id: mySoundID,
			url: 'sounds/practice' + nextTrial + '.mp3',
			autoLoad: true,
			onload: function() {
				$("#loading").hide();
			}
		});
		mySound.questionState = 0;
		
		bindExperimentPlayLink();
	});
});

function loadPracticePartB() {
	trialPos = experiment.getTrialPos();
	
	// show answers for Part A
	showAnswersA(nextTrial);

	// update content for second part
	$("#question_header").html("Practice Question " + (trialPos + 1) + "B out of " + trialCount);
	$("#description").html(content["instructions"].partB);
	$("#whichHighlight").hide();
	$("#nextTrial").unbind();
	$("#nextTrial").bind('click', loadNextPractice);
	$("#nextTrial").attr("disabled", "disabled");
	enableExperimentSound("#soundclip");

	// save timing for first question
	nowTime = new Date().getTime();
	experiment.saveFirstTiming(experiment.getTrialPos(), nowTime - baseTime);
}

function loadNextPractice() {	
	trialPos = experiment.getTrialPos();
	if (!showAnswersB(nextTrial)) { return false; }
	
	nextTrial = experiment.getNextTrial();
	
	// get updated trial number
	trialPos = experiment.getTrialPos();
	if (trialPos != experiment.END_OF_TRIALS) {
		var nextTrialURL = "sounds/practice" + nextTrial + ".mp3";
		
		// reset sound player
		soundManager.destroySound(mySoundID);
		mySoundID = "practice" + nextTrial;
		mySound = soundManager.createSound({
			id: mySoundID,
			url: nextTrialURL,
			autoLoad: true,
			onload: function() {
				$("#loading").hide();
			}
		});
		mySound.questionState = 0;
		$("#soundclip").unbind();
		enableExperimentSound("#soundclip");
		$("#soundclip").removeClass('clipPlaying');
		$("#playsLeft").html(experiment.getPlayLimit());

		// reset content
		$("#whichHighlight").hide();
		$("#whichShorter").hide();
		$("#percentage").hide();

		$("#toneA").val("1");
		$("#toneB").val("1");
		$("#shorterTone").val("A");
		$("#description").html(content["instructions"].partA);

		// rebind next button
		$("#nextTrial").unbind();
		$("#nextTrial").bind('click', loadPracticePartB);
		$("#nextTrial").attr("disabled", "disabled");

		// replace content
		$("#question_header").html("Practice Question " + (trialPos + 1) + "A out of " + trialCount);
		loadPracticePercentageChoices(nextTrial);
	} else { 
		// move to real questions
		window.location = 'experiment.html?assignmentId=' + aID + '&chartType=' + chartType;
	}
};

function loadPracticePercentageChoices(trialNum) {
	$("#percentage").html(content["practice" + trialNum].percentage);
}

function showAnswersA(trialNum) {
	var checkBase = "Check your answers:\n The highlighted tones were the ";
	if (trialNum == 1) {
		alert(checkBase + "2nd and the 5th.");
	} else if (trialNum == 2) {
		alert(checkBase + "2nd and the 4th.");
	} else if (trialNum == 3) {
		alert(checkBase + "3rd and the 5th.");
	}
}

function showAnswersB(trialNum) {
	var practiceAnswer = $("input[@name=practiceAnswer]:checked").val();
	if (practiceAnswer == undefined) {
		alert("Please answer all the questions!");
		return false;
	}
	
	var checkBase = "Check your answers:\n";

	if (trialNum == 1) { // if practice1
		alert(checkBase + "The shorter tone was B.\nThe percentage was 13.\n");
	} else if (trialNum == 2) {
		alert(checkBase + "The shorter tone was B.\nThe percentage was 22.\n");
	} else if (trialNum == 3) {
		alert(checkBase + "The shorter tone was B.\nThe percentage was 37.\n"); 
	}
	return true;
}
