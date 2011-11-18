// set up SoundManager
soundManager.url = 'soundmanager/swf';
soundManager.debugMode = false;
soundManager.useConsole = false;
soundManager.waitForWindowLoad = false;
soundManager.useHTML5Audio = false;
var mySound;
var mySoundID;
var practice1, practice2, practice3;

function bindPlayLink(soundclipdiv, sound) {
	// set up SoundManager
	$(soundclipdiv + " #time_pos").html("0:00");
	$(soundclipdiv).bind('click', function() {
		if (sound.paused || sound.playState == 0) { //stopped or paused
			$(soundclipdiv).addClass('clipPlaying');
			sound.play({
				onfinish: function() {
					$(soundclipdiv).removeClass('clipPlaying');
				}
			});
		} else { //playing
			sound.pause();
			$(soundclipdiv).removeClass('clipPlaying');
		}
	});
}

function bindExperimentPlayLink() {
	var sound = mySound;
	var soundclipdiv = "#soundclip";
	// set up SoundManager
	$(soundclipdiv).bind('click', function() {
		if (sound.paused || sound.playState == 0) { //stopped or paused
			$(soundclipdiv).addClass('clipPlaying');
			mySound.play({
				onfinish: function() {
					$(soundclipdiv).removeClass('clipPlaying');
					// decrease allowed play count
					var allowedPlaysLeft = $("#playsLeft").html() - 1;
					$("#playsLeft").html(allowedPlaysLeft);
					// if play count hits zero, disable buttons
					if (allowedPlaysLeft == 0) {
						$(soundclipdiv).addClass('clipDisabled');
						$(soundclipdiv).unbind();
					}
					if (this.questionState == 0) {
						this.questionState = 1;
						// change prompt
						$("#description").html("Answer the following questions, then press play again. <b>Pay attention to what percent the length of the shorter tone is of the length of the longer tone.</b> For example, if the shorter tone is half as long as the longer tone, the percentage would be 50%. Try not to make a precise measurement and go with your gut instinct. <b>You won't be able to change your first two answers once the clip finishes playing the second time!</b>");
						// show new question widgets
						$("#whichHighlight").show();
						$("#whichShorter").show();

						// start timer
						baseTime = new Date().getTime();
						nowTime = baseTime;
					} else if (this.questionState == 1) {
						this.questionState = 2;
						
						// save timing for first answer
						experiment.saveFirstTiming(experiment.getTrialPos(), nowTime - baseTime); // in milliseconds
						// disable previous question widgets
						$("#whichHighlight select").attr("disabled", "disabled");
						$("#whichShorter select").attr("disabled", "disabled");
						$("#percentage").show();
						$("#nextTrial").removeAttr("disabled");
						// start second timer
						baseTime = new Date().getTime();
					}
				}
			});
		} else {
			sound.pause();
			$(soundclipdiv).removeClass('clipPlaying');
		}
	});
}

function getTime(milSec) {
	var minutes = Math.floor((milSec % (1000*60*60)) / (1000*60));
	var seconds = Math.floor(((milSec % (1000*60*60)) % (1000*60)) / 1000) - (minutes * 60);
	if (seconds < 10) { // if a single digit number, pad with a 0
		seconds = "0" + seconds.toString();
	}
	return (minutes + ":" + seconds);
}
