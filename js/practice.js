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
	$("#question_header").html("Practice Question " + (trialPos + 1) + " out of " + trialCount);
	$("#part_header").html("Part A");
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
	if (!showAnswersA(nextTrial)) { return false; };
	mySound.questionState = 1;
	soundManager.stop(mySoundID);
	$("#soundclip").removeClass('clipPlaying');
	disableSound("#soundclip");

	// update content for second part
	$("#part_header").html("Part B");
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
	mySound.questionState = 2;
	soundManager.stop(mySoundID);
	$("#soundclip").removeClass('clipPlaying');
	disableSound("#soundclip");
	
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
		$("#question_header").html("Practice Question " + (trialPos + 1) + " out of " + trialCount);
		$("#part_header").html("Part A");
		loadPracticePercentageChoices(nextTrial);
	} else { 
		// move to real questions
		window.location = 'experiment.html?assignmentId=' + aID + '&chartType=' + chartType;
	}
};

function loadPracticePercentageChoices(trialNum) {
	$("#percentage").html(content["practice" + trialNum].percentage);
}

// Also validate the answers.
function showAnswersA(trialNum) {
	var toneA = $("#toneA").val();
	var toneB = $("#toneB").val();
	var correct = false;
	if (trialNum == 1) {
		if ((toneA == 2 && toneB == 5) || (toneA == 5 && toneB == 2)) {
			correct = true;
		}
	} else if (trialNum == 2) {
		if ((toneA == 2 && toneB == 4) || (toneA == 4 && toneB == 2)) {
			correct = true;
		}
	} else if (trialNum == 3) {
		if ((toneA == 3 && toneB == 5) || (toneA == 5 && toneB == 3)) {
			correct = true;
		}
	}
	if (!correct) {
		showIncorrectMessage();
		mySound.questionState = 0;
		disableSound("#soundclip");
		enableExperimentSound("#soundclip");
	}
	return correct;
}

// Also validate the answers.
function showAnswersB(trialNum) {
	var correct = false;
	var shorterTone = $("#shorterTone").val();
	var practiceAnswer = $("input[@name=practiceAnswer]:checked").val();
	if (practiceAnswer == undefined) {
		alert("Please answer all the questions!");
		return false;
	}
	
	if (trialNum == 1) { // if practice1
		if (shorterTone == "B" && practiceAnswer == 13) {
			correct = true;
		} 
	} else if (trialNum == 2) {
		if (shorterTone == "B" && practiceAnswer == 22) {
			correct = true;
		}
	} else if (trialNum == 3) {
		if (shorterTone == "B" && practiceAnswer == 37) {
			correct = true;
		}
	}
	if (!correct) {
		showIncorrectMessage();
		mySound.questionState = 1;
		disableSound("#soundclip");
		enableExperimentSound("#soundclip");
	}
	return correct;
}

function showIncorrectMessage() {
		alert("Some of your responses are incorrect.\nBecause this is practice, you can listen to the clip and try again.");
}
