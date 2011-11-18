var experiment;
var chartType;
var aID;
var trialCount = 3; // CHANGE THIS TO 3
var trialPos;

$(document).ready(function() {
	// get values from url string
	chartType = $.urlParam("chartType");
	aID = $.urlParam("assignmentId");
	
	// create practice experiment object
	experiment = new SonificationExperiment(chartType, trialCount);
	
	// assign click events
	$("#nextTrial").bind('click', loadNextPractice);

	// show preview warning if needed
	if (aID == "ASSIGNMENT_ID_NOT_AVAILABLE") {
		$("#previewWarning").css('display', 'block');
	}
	
	// populate play count information
	$("#maxPlayCount").html(experiment.getPlayLimit());
	$("#playsLeft").html(experiment.getPlayLimit());

	var nextTrial = experiment.getNextTrial();

	// load answer choices for first trial
	loadPracticePercentageChoices(nextTrial);

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

function loadNextPractice() {	
	trialPos = experiment.getTrialPos();
	var validAnswers = validatePractice(trialPos);
	if (!validAnswers) { return false; }
	
	var nextTrial = experiment.getNextTrial();
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
		bindExperimentPlayLink();
		$("#soundclip").removeClass('clipDisabled');
		$("#soundclip").removeClass('clipPlaying');
		$("#playsLeft").html(experiment.getPlayLimit());

		// reset content
		$("#whichHighlight").hide();
		$("#whichShorter").hide();
		$("#percentage").hide();
		$("#whichHighlight select").removeAttr("disabled");
		$("#whichShorter select").removeAttr("disabled");
		$("#toneA").val("1");
		$("#toneB").val("1");
		$("#shorterTone").val("A");
		$("#description").html("Play the clip below. It will consist of five tones. As it's playing, <b>pay attention to the order of the two highlighted tones and which of the two is shorter.</b>");
		$("#nextTrial").attr("disabled", "disabled");

		// replace content
		$("#question_header").html("Practice Question " + (trialPos + 1) + " out of " + trialCount);
		loadPracticePercentageChoices(nextTrial);
		//$("#questions").html(content["practice" + nextTrial].questions);
	} else { 
		// move to real questions
		window.location = 'experiment.html?assignmentId=' + aID + '&chartType=' + chartType;
	}
};

function loadPracticePercentageChoices(trialNum) {
	$("#percentage").html(content["practice" + trialNum].percentage);
}

function validatePractice(trialNum) {
	/*
	if (trialNum == 0) {
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
	} else { // TODO check for other trials
	
	}*/
	return true;
}
