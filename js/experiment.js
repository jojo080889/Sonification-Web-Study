var experiment;
// get values from url string
var chartType = $.urlParam("chartType");
var aID = $.urlParam("assignmentId");
var trialCount;
var baseTime, firstAnswerTime;
var trialPos;
var nextTrial;

$(document).ready(function() {
	trialCount = chartTypeWords[chartType]['trialNum'];

	// create experiment object
	experiment = new SonificationExperiment(chartType, trialCount);
	
	// fill in hidden form and assign events
	$("#assignmentId").val(aID);
	$("#nextTrial").bind('click', loadPartB);

	// show preview warning if needed
	if (aID == "ASSIGNMENT_ID_NOT_AVAILABLE") {
		$("#previewWarning").css('display', 'block');
	}
	
	// populate play count information
	$("#maxPlayCount").html(experiment.getPlayLimit());
	$("#playsLeft").html(experiment.getPlayLimit());

	var nextTrial = experiment.getNextTrial();

	// load question header and instructions
	trialPos = experiment.getTrialPos();
	$("#question_header").html("Question " + (trialPos + 1) + " out of " + trialCount);
	$("#part_header").html("Part A");
	$("#description").html(content["instructions"].partA);

	// load question text
	fillInQuestionText();

	// set up soundmanager
	mySoundID = nextTrial;
	soundManager.onready(function() {
		mySound = soundManager.createSound({
			id: mySoundID,
			url: 'sounds/' + chartType + '/' + nextTrial + '.mp3',
			autoLoad: true,
			onload: function() {
				$("#loading").hide();
			}
		});
		mySound.questionState = 0;

		bindExperimentPlayLink();
	});
});

function loadPartB() {
	trialPos = experiment.getTrialPos();
	var toneA = $("#toneA").val();
	var toneB = $("#toneB").val();

	if (toneA == "noAnswer" || toneB == "noAnswer") {
		alert("Please answer all the questions!");
		return false;
	}

	// update content for second part
	$("#part_header").html("Part B");
	$("#description").html(content["instructions"].partB);
	$("#whichHighlight").hide();
	$("#nextTrial").unbind();
	$("#nextTrial").bind('click', loadNextTrial);
	$("#nextTrial").attr("disabled", "disabled");
	enableExperimentSound("#soundclip");

	//save timing for first question
	updateFirstAnswerTime();
}

function loadNextTrial() {	
	trialPos = experiment.getTrialPos();

	// make sure participants fill out the questions
	var validAnswers = validateAnswers();
	if (!validAnswers) { return false; }

	// Save participant answers 
	if (trialPos != experiment.END_OF_TRIALS) {
		var answerArray = []; // don't need to save trialPos, since that = index of answer arrays
		answerArray.push(experiment.getCurrentTrial());
		answerArray.push($("#toneA").val());
		answerArray.push($("#toneB").val());
		answerArray.push($("#shorterTone").val());
		answerArray.push($("#percentAnswer").val());
		experiment.saveTrialAnswer(trialPos, answerArray);
	
		// timing for first half is recorded onFinish of second play
		// record timing for second half
		updateSecondAnswerTime();

		// record number of plays it took for the participant to answer
		var playsLeft = $("#playsLeft").html();
		experiment.savePlayCount(trialPos, experiment.getPlayLimit() - playsLeft);
	}

	// Prepare to load next trial
	var nextTrial = experiment.getNextTrial();
	trialPos = experiment.getTrialPos();
	if (trialPos != experiment.END_OF_TRIALS) {
		var nextTrialURL = "sounds/" + chartType + "/" + nextTrial + ".mp3";
		
		// reset sound player
		soundManager.destroySound(mySoundID);
		mySoundID = nextTrial;
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
		$("#percentage input").val("");
		$("#description").html(content["instructions"].partA);

		// rebind next button
		$("#nextTrial").unbind();
		$("#nextTrial").bind('click', loadPartB);
		$("#nextTrial").attr("disabled", "disabled");

		// replace content
		$("#question_header").html("Question " + (trialPos + 1) + " out of " + trialCount);
		$("#part_header").html("Part B");

		// reset baseTime
		baseTime = new Date().getTime();
	} else if (trialPos == experiment.END_OF_TRIALS) { // last trial
		// submit the mturk_form so that it either goes to the 
		// next stage or to the demographics form

		$("#" + chartType + "AnswerData").val(experiment.getTrialAnswers());
		$("#" + chartType + "FirstTimingData").val(experiment.getFirstTimingData());
		$("#" + chartType + "SecondTimingData").val(experiment.getSecondTimingData());
		$("#" + chartType + "PlaycountData").val(experiment.getPlayCountData());
		$("#mturk_form").submit();
	}
};

// Since the dropdowns get disabled after the second play finishes,
// this function should only be called before that point.
function updateFirstAnswerTime() {
	// record how long it took for the participant to answer
	nowTime = new Date().getTime();
	experiment.saveFirstTiming(experiment.getTrialPos(), nowTime - baseTime);
}

function updateSecondAnswerTime() {
	nowTime = new Date().getTime();
	experiment.saveSecondTiming(experiment.getTrialPos(), nowTime - baseTime);
}

function validateAnswers() {
	// make sure user enters a number for the percentage answer
	var percentAnswer = $("#percentAnswer").val();
	var shortTone = $("#shorterTone").val();
	if ($.trim(percentAnswer) == "" || shortTone == "noAnswer") {
		alert("Please answer all the questions!");
		return false;
	} else if (percentAnswer != parseInt(percentAnswer)) {
		alert("The percent you entered must be a whole number.");
		return false;
	}
	return true;
}

