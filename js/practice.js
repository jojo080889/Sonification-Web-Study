var experiment;
// get values from url string
var chartType = $.urlParam("chartType");
var aID = $.urlParam("assignmentId");
var trialCount;
var trialPos;
var nextTrial;

$(document).ready(function() {
	trialCount = chartTypeWords[chartType]['practiceNum'];

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

	// load question text
	fillInQuestionText();

	// set up soundmanager
	mySoundID = 'practice' + nextTrial;
	soundManager.onready(function() {
		mySound = soundManager.createSound({
			id: mySoundID,
			url: 'sounds/' + chartType + '/practice' + nextTrial + '.mp3',
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
	$("#incorrectMessage").hide();
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
	$("#incorrectMessage").hide();
	mySound.questionState = 2;
	soundManager.stop(mySoundID);
	$("#soundclip").removeClass('clipPlaying');
	disableSound("#soundclip");
	
	nextTrial = experiment.getNextTrial();
	
	// get updated trial number
	trialPos = experiment.getTrialPos();
	if (trialPos != experiment.END_OF_TRIALS) {
		var nextTrialURL = "sounds/" + chartType + "/practice" + nextTrial + ".mp3";
		
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

		$("#toneA").val("noAnswer");
		$("#toneB").val("noAnswer");
		$("#shorterTone").val("noAnswer");
		$("#description").html(content["instructions"].partA);
		resetPracticePercentageAnswer();

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
		$("#mturk_form").submit();
	}
};

function resetPracticePercentageAnswer() {
	for (var i = 1; i <= 4; i++) {
		$("#practiceAnswer" + i).removeAttr("checked");
	}
}

function loadPracticePercentageChoices(trialNum) {
	var practiceOptions = chartTypeWords[chartType]['practiceOptions'];
	var optionArray = practiceOptions[trialNum - 1][0];
	for (var i = 0; i < optionArray.length; i++) {
		$("#practiceOptions #practiceAnswer" + (i + 1)).val("" + optionArray[i]);
		$("#practiceOptions #practiceAnswerLabel" + (i + 1)).html(optionArray[i] + "%");
	}
}

// Also validate the answers.
function showAnswersA(trialNum) {
	var toneA = $("#toneA").val();
	var toneB = $("#toneB").val();
	var correct = false;
	if (toneA == "noAnswer" || toneB == "noAnswer") {
		alert("Please answer all the questions!");
		return false;
	}
	var practiceOptions = chartTypeWords[chartType]['practiceOptions'];
	var toneArray = practiceOptions[trialNum - 1][1];
	if ((toneA == toneArray[0] && toneB == toneArray[1]) ||
		(toneA == toneArray[1] && toneB == toneArray[0])) {
		correct = true;	
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
	if (practiceAnswer == undefined || shorterTone == "noAnswer") {
		alert("Please answer all the questions!");
		return false;
	}

	var practiceOptions = chartTypeWords[chartType]['practiceOptions'];
	var correctArray = practiceOptions[trialNum - 1][2];
	var optionsArray = practiceOptions[trialNum - 1][0];
	var correctPer = optionsArray[correctArray[1]];
	if (shorterTone == correctArray[0] && practiceAnswer == correctPer) {
		correct = true;
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
		$("#incorrectMessage").show();
}
