var experiment;
var chartType;
var aID;
var trialCount = 24; // CHANGE THIS TO 24
var baseTime, firstAnswerTime;
var trialPos;
var nextTrial;

$(document).ready(function() {
	// get values from url string
	chartType = $.urlParam("chartType");
	aID = $.urlParam("assignmentId");
	
	// create experiment object
	experiment = new SonificationExperiment(chartType, trialCount);
	
	// fill in hidden form and assign events
	$("#assignmentId").val(aID);
	$("#chartType").val(chartType);
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

	// set up soundmanager
	mySoundID = nextTrial;
	soundManager.onready(function() {
		mySound = soundManager.createSound({
			id: mySoundID,
			url: 'sounds/' + nextTrial + '.mp3',
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
	if (trialPos != "demographics") {
		trialPos = experiment.getTrialPos();
	}

	var validAnswers;
	if (trialPos != "demographics") {
		// on the normal questions, make sure participants fill out the questions
		validAnswers = validateAnswers();
	} else { // demographics
		validAnswers = validateDemographics();
	}
	if (!validAnswers) { return false; }

	// Save participant answers 
	if ((trialPos != experiment.END_OF_TRIALS) && (trialPos != "demographics")) {
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

	// Prepare to load next trial
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
		// Replace with demographics content
		$("#question_header").html("Almost done!");
		$("#part_header").hide();
		$("#description").html(content['demographics'].description);
		$("#questions").html(content['demographics'].questions);
		$("#soundclip").hide();
		soundManager.destroySound(mySoundID);
		$("#playInfo").hide();

		// bind demographic sound clips
		practice1 = soundManager.createSound({
			id: "practice1",
			url: "sounds/practice1.mp3",
			autoLoad: true,
			onload: function() {
				$("#soundclip_samepitch #loading").hide();
			}
		});
		practice2 = soundManager.createSound({
			id: "practice2",
			url: "sounds/practice2.mp3",
			autoLoad: true,
			onload: function() {
				$("#soundclip_mixedpitch #loading").hide();
			}
		});
		practice3 = soundManager.createSound({
			id: "practice3",
			url: "sounds/practice3.mp3",
			autoLoad: true,
			onload: function() {
				$("#soundclip_orderpitch #loading").hide();
			}
		});
		bindPlayLink("#soundclip_samepitch", practice1);
		bindPlayLink("#soundclip_orderpitch", practice3);
		bindPlayLink("#soundclip_mixedpitch", practice2);
		
		if (aID == "ASSIGNMENT_ID_NOT_AVAILABLE") {
			$("#nextTrial").attr('disabled', 'disabled');
			$("#nextTrial").html("You must ACCEPT the HIT before you can submit the results.");
		} else {
			$("#nextTrial").html("Submit");
		}

		trialPos = "demographics";
	} else { // demographics
		// Populate hidden form and submit it
		$("#answerData").val(experiment.getTrialAnswers());
		$("#firstTimingData").val(experiment.getFirstTimingData());
		$("#secondTimingData").val(experiment.getSecondTimingData());
		$("#playcountData").val(experiment.getPlayCountData());
		$("#demographics").val(experiment.getDemographics());
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

function validateDemographics() {
	var checked = $("input:checked");
	var ageAnswer = $.trim($("#ageAnswer").val());
	if (checked.length != 7 || ageAnswer == "") {
		alert("Please answer all the questions!");
		return false;
	}
	return true;
}
