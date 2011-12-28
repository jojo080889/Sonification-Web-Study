// graph.js

function questionCountdown() {
	var countdownSquares = $("#countdown_bar .square");

	var curSec = $("#countdown_desc #countdown").html();
	if (curSec <= 1) {
		// cancel the interval
		clearInterval(questionInterval);

		$("#countdown_desc").hide();
		$("#countdown_bar").hide();
		$("#graph").hide();
		$("#description").hide();
		$("#questions").show();
		$("#nextTrial").removeAttr("disabled");
		
		// reset baseTime
		baseTime = new Date().getTime();
	} else {
		$("#countdown_desc #countdown").html(curSec - 1);
		$(countdownSquares[20 - curSec]).css('backgroundColor', '#ddd');
	}
}

function drawGraph(nextTrial, isPractice) {
	if (isPractice == undefined) {
		isPractice = false;
	}

	// draw graph
	$("#loadinggraph").hide();
	var dataArr, highlightArr, isAnimated, isDuration, isVolume, durArray;
	if (isPractice) {
		dataArr = practiceDataArrays[nextTrial - 1];
		highlightArr = practiceHighlightArrays[nextTrial - 1];
		isAnimated = (nextTrial == 2);
		isDuration = (nextTrial == 1);
		isVolume = (nextTrial == 2);
		durArray = practiceToneArrays[nextTrial];
	} else {
		dataArr = dataArrays[nextTrial - 1];
		highlightArr = highlightArrays[nextTrial - 1];
		isAnimated = (nextTrial >= 19 && nextTrial < 37);
		isDuration = (nextTrial >= 1 && nextTrial < 7) || (nextTrial >= 19 && nextTrial < 25);
		isVolume = (nextTrial >= 7 && nextTrial < 13) || (nextTrial >= 25 && nextTrial < 31);
		durArray = toneArrays[nextTrial];
	}
	var bars = $(".bar");
	var marks = $(".bar .mark");

	if (isAnimated && (isVolume || isDuration)) {
		//animateBar(bars, 0, dataArr, durArray);
		waitBar(bars, 0, durArray[0][0], dataArr, durArray)
	}
	for (var i = 0; i < dataArr.length; i++) {
		// mark the highlighted bars
		if (highlightArr[i]) {
			$(marks[i]).html("&#8226;");
		}

		// draw the actual bars
		if (isAnimated && (isVolume || isDuration)) {
			// do nothing
		} else if (isAnimated) {
			$(bars[i]).delay(2000 * i).animate({opacity: 1}, 1).animate({ height: ((dataArr[i] * 1.8) + "px") }, 1000, 'linear');
		} else {
			$(bars[i]).css("opacity", 1).css("height", (dataArr[i] * 1.8) + "px");
		}
	}
}

function animateBar(bars, i, dataArr, durArray) {
	//console.log("animateBar" + i);
	var bar = $(bars[i]);
	bar.css("opacity", 1);
	var height = 0;
	var maxHeight = (dataArr[i] * 1.8);
	var length = (durArray[i][1] - durArray[i][0]);
	doTimer(length, 50, function(steps)
	{
		height = height + (maxHeight / steps);
		bar.css("height", height + "px");
	},
	function()
	{
		bar.css("height", maxHeight + "px");
		if (i < 4) {
			i = i + 1;
			delay = durArray[i][0] - durArray[i - 1][1];
			//console.log("delay = " + delay + ", " + durArray[i][0] + " - " + durArray[i - 1][1]);
			waitBar(bars, i, delay, dataArr, durArray);
		}
	});
}

function waitBar(bars, i, delay, dataArr, durArray) {
	//console.log("waitBar" + i);
	var opacity = 1;
	doTimer(delay, 50, function(steps)
	{
		opacity = opacity - (1 / steps);
	},
	function()
	{
		animateBar(bars, i, dataArr, durArray);
	});
}

function resetCountdownBar() {
	$("#countdown_bar").css('opacity', 1);
	$("#countdown_bar .square").css('backgroundColor', '#A4D5FF');
	$("#countdown_bar").show();
}