var experiment;
// get values from url string
var chartType = $.urlParam("chartType");
var aID = $.urlParam("assignmentId");
var trialCount;
var trialPos;
var nextTrial;

// set countdown for showing a question
var questionInterval;

// answeres for practice questions
var practiceOptions = [
	[[68, 5, 10, 13], [3, 0]], //practice1
	[[86, 94, 22, 98], [5, 2]] //practice2
];

$(document).ready(function() {
	trialCount = 2

	// create practice experiment object
	experiment = new SonificationExperiment(chartType, trialCount);

	// show preview warning if needed
	if (aID == "ASSIGNMENT_ID_NOT_AVAILABLE") {
		$("#previewWarning").css('display', 'block');
	}
	
	// assign click events
	$("#nextTrial").bind('click', loadNextPractice);
	$("#try_again").bind('click', resetPracticeQuestion);

	nextTrial = experiment.getNextTrial();

	// load answer choices for first trial
	loadPracticePercentageChoices(nextTrial);

	// load question header and instructions
	trialPos = experiment.getTrialPos();
	$("#question_header").html("Practice Question " + (trialPos + 1) + " out of " + trialCount);

	// set up soundmanager
	mySoundID = 'practice' + nextTrial;
	soundManager.onready(function() {
		mySound = soundManager.createSound({
			id: mySoundID,
			url: 'sounds/viz-son/practice' + nextTrial + '.mp3',
			autoLoad: true,
			onload: function() {
				$("#loading").hide();
				drawGraph(nextTrial, true);
				this.play();
				questionInterval = setInterval("questionCountdown()", 1000);
			}
		});
	});
});

function resetPracticeQuestion() {
	$("#incorrectMessage").hide();
	soundManager.stop(mySoundID);
	
	// reset graph
	$(".bar").css("height", 0).css("opacity", 0);
	$("#graph").show();
	
	// reset content
	$("#graph .mark").html("");
	$("#smallerBar").val("noAnswer");
	$("#nextTrial").attr("disabled", "disabled");
	$("#countdown_desc #countdown").html("20");
	$("#questions").hide();
	$("#countdown_desc").show();	
	resetPracticePercentageAnswer();
	
	// reset sound player
	var nextTrialURL = "sounds/viz-son/practice" + nextTrial + ".mp3";
	if (mySoundID != undefined) {
		soundManager.destroySound(mySoundID);
	}
	mySoundID = "practice" + nextTrial;
	mySound = soundManager.createSound({
		id: mySoundID,
		url: nextTrialURL,
		autoLoad: true,
		onload: function() {
			$("#loading").hide();
			drawGraph(nextTrial, true);
			this.play();
			questionInterval = setInterval("questionCountdown()", 1000);
		}
	});
}

function loadNextPractice() {	
	trialPos = experiment.getTrialPos();
	if (!showAnswers(nextTrial)) { return false; }
	$("#incorrectMessage").hide();
	soundManager.stop(mySoundID);
	
	nextTrial = experiment.getNextTrial();
	
	// get updated trial number
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
		$("#countdown_desc").show();	
		resetPracticePercentageAnswer();
		
		// replace content
		$("#question_header").html("Practice Question " + (trialPos + 1) + " out of " + trialCount);
		loadPracticePercentageChoices(nextTrial);
		
		var nextTrialURL = "sounds/viz-son/practice" + nextTrial + ".mp3";
		
		// reset sound player
		if (mySoundID != undefined) {
			soundManager.destroySound(mySoundID);
		}
		mySoundID = "practice" + nextTrial;
		mySound = soundManager.createSound({
			id: mySoundID,
			url: nextTrialURL,
			autoLoad: true,
			onload: function() {
				$("#loading").hide();
				drawGraph(nextTrial, true);
				this.play();
				questionInterval = setInterval("questionCountdown()", 1000);
			}
		});
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
	var optionArray = practiceOptions[trialNum - 1][0];
	for (var i = 0; i < optionArray.length; i++) {
		$("#practiceOptions #practiceAnswer" + (i + 1)).val("" + optionArray[i]);
		$("#practiceOptions #practiceAnswerLabel" + (i + 1)).html(optionArray[i] + "%");
	}
}

// Also validate the answers.
function showAnswers(trialNum) {
	var correct = false;
	var smallerBar = $("#smallerBar").val();
	var practiceAnswer = $("input[@name=practiceAnswer]:checked").val();
	if (practiceAnswer == undefined || smallerBar == "noAnswer") {
		alert("Please answer all the questions!");
		return false;
	}

	var correctArray = practiceOptions[trialNum - 1][1];
	var optionsArray = practiceOptions[trialNum - 1][0];
	var correctPer = optionsArray[correctArray[1]];
	if (smallerBar == correctArray[0] && practiceAnswer == correctPer) {
		correct = true;
	}
	
	if (!correct) {
		showIncorrectMessage();
	}
	return correct;
}

function showIncorrectMessage() {
		$("#incorrectMessage").show();
}
