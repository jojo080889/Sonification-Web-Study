var experiment;
// get values from url string
var chartType = $.urlParam("chartType");
var aID = $.urlParam("assignmentId");
var trialCount;
var baseTime, firstAnswerTime;
var trialPos;
var nextTrial;

$(document).ready(function() {
	trialCount = 36;

	// create experiment object
	experiment = new SonificationExperiment(chartType, trialCount);
	
	// fill in hidden form and assign events
	$("#assignmentId").val(aID);
	$("#nextTrial").bind('click', loadNextTrial);

	// show preview warning if needed
	if (aID == "ASSIGNMENT_ID_NOT_AVAILABLE") {
		$("#previewWarning").css('display', 'block');
	}
	
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
				}
			});
		});
	} else {
		// just draw the graph
		drawGraph(nextTrial);
	}
});

function drawGraph(nextTrial) {
	// draw graph
	$("#loadinggraph").hide();
	var dataArr = dataArrays[nextTrial - 1];
	var highlightArr = highlightArrays[nextTrial - 1];
	var isAnimated = (nextTrial >= 19 && nextTrial < 37);
	var isDuration = (nextTrial >= 1 && nextTrial < 7) || (nextTrial >= 19 && nextTrial < 25);
	var isVolume = (nextTrial >= 7 && nextTrial < 13) || (nextTrial >= 25 && nextTrial < 31);
	var bars = $(".bar");
	var durationDelay = 70;

	for (var i = 0; i < dataArr.length; i++) {
		if (isAnimated && isVolume) {
			$(bars[i]).delay(2000 * i).animate( { height: ((dataArr[i] * 1.8) + "px") }, 1000);
		} else if (isAnimated && isDuration) {
			var dur = (dataArr[i] / 40) * 1000; 
			$(bars[i]).delay(durationDelay).animate({ height: ((dataArr[i] * 1.8) + "px") }, dur);
			durationDelay += (dur + 2500);
		} else if (isAnimated) {
			$(bars[i]).delay(1000 * i).animate({ height: ((dataArr[i] * 1.8) + "px") });
		} else {
			$(bars[i]).css("height", (dataArr[i] * 1.8) + "px");
		}
	}
}

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
		answerArray.push($("#smallerBar").val());
		answerArray.push($("#percentAnswer").val());
		experiment.saveTrialAnswer(trialPos, answerArray);
	
		// timing for first half is recorded onFinish of second play
		// record timing for second half
		updateSecondAnswerTime();
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
		$("#smallerBar").val("noAnswer");
		$("#percentage input").val("");
		$("#nextTrial").attr("disabled", "disabled");

		// replace content
		$("#question_header").html("Question " + (trialPos + 1) + " out of " + trialCount);
		
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
	} else if (parseInt(percentAnswer) > 100) {
		alert("The percent you entered must be less than 100.");
		return false;
	} else if (parseInt(percentAnswer) < 0) {
		alert("The percent you entered must be 0 or greater.");
		return false;
	}
	return true;
}

