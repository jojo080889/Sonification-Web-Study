var experiment;
var chartType;
var aID;
var trialCount = 24; // CHANGE THIS TO 24
var baseTime;
var trialPos;

$(document).ready(function() {
	// get values from url string
	chartType = $.urlParam("chartType");
	aID = $.urlParam("assignmentId");
	
	// create experiment object
	experiment = new SonificationExperiment(chartType, trialCount);
	
	// fill in hidden form and assign events
	$("#assignmentId").val(aID);
	$("#chartType").val(chartType);
	$("#nextTrial").bind('click', loadNextTrial);
	$("#toneA").bind('change', updateFirstAnswerTime);
	$("#toneB").bind('change', updateFirstAnswerTime);
	$("#shorterTone").bind('change', updateFirstAnswerTime);

	// show preview warning if needed
	if (aID == "ASSIGNMENT_ID_NOT_AVAILABLE") {
		$("#previewWarning").css('display', 'block');
	}
	
	// populate play count information
	$("#maxPlayCount").html(experiment.getPlayLimit());
	$("#playsLeft").html(experiment.getPlayLimit());

	var nextTrial = experiment.getNextTrial();

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
	
	// To keep track of how long it takes the participant to answer
	baseTime = new Date().getTime();
});

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
		$("#description").html("Play the clip below. It will consist of five tones. As it's playing, <b>pay attention to the order of the two highlighted tones and which of the two is shorter.</b> Try not to make a precise measurement and go with your gut instinct.");
		$("#nextTrial").attr("disabled", "disabled");
		$("#percentage input").val("");

		// replace content
		$("#question_header").html("Question " + (trialPos + 1) + " out of " + trialCount);
		//$("#questions").html(content[chartType].questions);
		
		// reset baseTime
		baseTime = new Date().getTime();
	} else if (trialPos == experiment.END_OF_TRIALS) { // last trial
		// Replace with demographics content
		$("#question_header").html("Almost done!");
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
		
		trialPos = "demographics";
	} else { // demographics
		// Populate hidden form and submit it
		if (aID == "ASSIGNMENT_ID_NOT_AVAILABLE") {
			$("#nextTrial").attr('disabled', 'disabled');
			$("#nextTrial").html("You must ACCEPT the HIT before you can submit the results.");
		} else {
			$("#nextTrial").html("Submit");
		}
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
	var nowTime = new Date().getTime();
	experiment.saveFirstTiming(experiment.getTrialPos(), nowTime - baseTime); // in milliseconds
}

function updateSecondAnswerTime() {
	var nowTime = new Date().getTime();
	experiment.saveSecondTiming(experiment.getTrialPos(), nowTime - baseTime);
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
	if (checked.length != 7 || ageAnswer == "") {
		alert("Please answer all the questions!");
		return false;
	}
	return true;
}
