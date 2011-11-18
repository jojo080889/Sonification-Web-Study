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
	$("#nextTrial").bind('click', loadNextPractice);

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
	var validAnswers = validatePractice(nextTrial);
	if (!validAnswers) { return false; }
	
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
	// make sure user enters the right answers
	var toneA = $("#toneA").val();
	var toneB = $("#toneB").val();
	var shorterTone = $("#shorterTone").val();
	var practiceAnswer = $("input[@name=practiceAnswer]:checked").val();
	if (practiceAnswer == undefined) {
		alert("Please answer all the questions!");
		return false;
	}
		
	if (trialNum == 1) { // if practice1
		alert("Check your answers:\nThe highlighted tones were the 1st and the 5th.\nThe shorter tone was A.\nThe percentage was 13.\n");
	} else if (trialNum == 2) {
		alert("Check your answers:\nThe highlighted tones were the 1st and the 3rd.\nThe shorter tone was B.\nThe percentage was 22.\n");
	} else if (trialNum == 3) {
		alert("Check your answers:\nThe highlighted tones were the 1st and the 3rd.\nThe shorter tone was A.\nThe percentage was 37.\n"); 
	}
	return true;
}
