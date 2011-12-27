var experiment;
// get values from url string
var chartType = $.urlParam("chartType");
var aID = $.urlParam("assignmentId");
var trialCount;
var baseTime, firstAnswerTime;
var trialPos;
var nextTrial;

// set countdown for showing a question
var questionInterval;

$(document).ready(function() {
	trialCount = 36;

	// create experiment object
	experiment = new SonificationExperiment(chartType, trialCount);

	// show preview warning if needed
	if (aID == "ASSIGNMENT_ID_NOT_AVAILABLE") {
		$("#previewWarning").css('display', 'block');
	}	
	
	// fill in hidden form and assign events
	$("#assignmentId").val(aID);
	$("#nextTrial").bind('click', loadNextTrial);
	
	var nextTrial = experiment.getNextTrial();
	
	// load question header and instructions
	trialPos = experiment.getTrialPos();
	$("#question_header").html("Question " + (trialPos + 1) + " out of " + trialCount);

	var hasSound = (nextTrial >= 1 && nextTrial < 13) || (nextTrial >= 19 && nextTrial < 31);
	
	if (hasSound) {
		// set up soundmanager
		mySoundID = nextTrial;
		soundManager.onready(function() {
			mySound = soundManager.createSound({
				id: mySoundID,
				url: 'sounds/viz-son/' + nextTrial + '.mp3',
				autoLoad: true,
				onload: function() {
					$("#loading").hide();
					drawGraph(nextTrial);
					this.play();
					$("#countdown_bar").animate({opacity: 1}, 20000);
					questionInterval = setInterval("questionCountdown()", 1000);
				}
			});
		});
	} else {
		// just draw the graph
		drawGraph(nextTrial);
		$("#countdown_bar").animate({opacity: 1}, 20000);
		questionInterval = setInterval("questionCountdown()", 1000);
	}
});

function loadNextTrial() {	
	trialPos = experiment.getTrialPos();

	// make sure participants fill out the questions
	var validAnswers = validateAnswers();
	if (!validAnswers) { return false; }

	// Save participant answers 
	if (trialPos != experiment.END_OF_TRIALS) {
		var answerArray = []; // don't need to save trialPos, since that = index of answer arrays
		answerArray.push(experiment.getCurrentTrial());
		answerArray.push($("#smallerBar").val());
		answerArray.push($("#percentAnswer").val());
		experiment.saveTrialAnswer(trialPos, answerArray);
	
		updateAnswerTime();
	}

	// Prepare to load next trial
	var nextTrial = experiment.getNextTrial();
	trialPos = experiment.getTrialPos();
	if (trialPos != experiment.END_OF_TRIALS) {
		// reset graph
		$(".bar").css("height", 0).css("opacity", 0);
		$("#graph").show();

		// reset content
		$("#graph .mark").html("");
		$("#smallerBar").val("noAnswer");
		$("#percentage input").val("");
		$("#nextTrial").attr("disabled", "disabled");
		$("#countdown_desc #countdown").html("20");
		$("#questions").hide();
		resetCountdownBar();
		$("#description").show();

		// replace content
		$("#question_header").html("Question " + (trialPos + 1) + " out of " + trialCount);
	
		var hasSound = (nextTrial >= 1 && nextTrial < 13) || (nextTrial >= 19 && nextTrial < 31);
		
		if (hasSound) {
			var nextTrialURL = "sounds/viz-son/" + nextTrial + ".mp3";
		
			// reset sound player
			if (mySoundID != undefined) {
				soundManager.destroySound(mySoundID);
			}
			mySoundID = nextTrial;
			mySound = soundManager.createSound({
				id: mySoundID,
				url: nextTrialURL,
				autoLoad: true,
				onload: function() {
					$("#loading").hide();
					drawGraph(nextTrial);
					this.play();
					$("#countdown_bar").animate({opacity: 1}, 20000);
					questionInterval = setInterval("questionCountdown()", 1000);
				}
			});
		} else {
			drawGraph(nextTrial);
			$("#countdown_bar").animate({opacity: 1}, 20000);
			questionInterval = setInterval("questionCountdown()", 1000);
		}
		
	} else if (trialPos == experiment.END_OF_TRIALS) { // last trial
		// submit the mturk_form so that it either goes to the 
		// next stage or to the demographics form

		$("#answerData").val(experiment.getTrialAnswers());
		$("#timingData").val(experiment.getFirstTimingData());
		$("#mturk_form").submit();
	}
};

function updateAnswerTime() {
	// record how long it took for the participant to answer
	nowTime = new Date().getTime();
	experiment.saveFirstTiming(experiment.getTrialPos(), nowTime - baseTime);
}

function validateAnswers() {
	// make sure user enters a number for the percentage answer
	var percentAnswer = $("#percentAnswer").val();
	var smallBar = $("#smallerBar").val();
	if ($.trim(percentAnswer) == "" || smallBar == "noAnswer") {
		alert("Please answer all the questions!");
		return false;
	} else if (percentAnswer != parseInt(percentAnswer)) {
		alert("The percent you entered must be a whole number.");
		return false;
	} else if (parseInt(percentAnswer) > 100) {
		alert("The percent you entered must be less than 100.");
		return false;
	} else if (parseInt(percentAnswer) < 0) {
		alert("The percent you entered must be 0 or greater.");
		return false;
	}
	return true;
}

