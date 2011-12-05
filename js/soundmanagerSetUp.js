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
					var sid = this.sID;
					if (sid == 'nohighlight') {
						normalListened = true;
					} else if (sid == 'highlight') {
						highlightListened = true;
					} 
					if ((sid == 'nohighlight' || sid == 'highlight') && normalListened && highlightListened) {
					$("#nextTrial").removeAttr("disabled");
					}
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
		if ((sound.sID + "").indexOf("practice") >= 0) {
			$("#incorrectMessage").hide();
		}
		if (sound.paused || sound.playState == 0) { //stopped or paused
			$(soundclipdiv).addClass('clipPlaying');
			mySound.play({
				onfinish: function() {
					$(soundclipdiv).removeClass('clipPlaying');
					// decrease allowed play count
					var allowedPlaysLeft = $("#playsLeft").html() - 1;
					$("#playsLeft").html(allowedPlaysLeft);
					// play can only play once
					disableSound(soundclipdiv);
					if (this.questionState == 0) {
						this.questionState = 1;
						// show new question widgets
						$("#whichHighlight").show();

						// reenable button
						$("#nextTrial").removeAttr("disabled");

						// start timer
						baseTime = new Date().getTime();
						nowTime = baseTime;
					} else if (this.questionState == 1) {
						this.questionState = 2;
						
						// show next question widgets
						$("#whichShorter").show();
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

function disableSound(soundclipdiv) {
	$(soundclipdiv).addClass('clipDisabled');
	$(soundclipdiv).unbind();
}

function enableExperimentSound(soundclipdiv) {
	$(soundclipdiv).removeClass('clipDisabled');
	bindExperimentPlayLink();
}

function getTime(milSec) {
	var minutes = Math.floor((milSec % (1000*60*60)) / (1000*60));
	var seconds = Math.floor(((milSec % (1000*60*60)) % (1000*60)) / 1000) - (minutes * 60);
	if (seconds < 10) { // if a single digit number, pad with a 0
		seconds = "0" + seconds.toString();
	}
	return (minutes + ":" + seconds);
}
