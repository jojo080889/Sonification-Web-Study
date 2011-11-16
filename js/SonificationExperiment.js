// Class SonificationExperiment
// Constructor
//		chartTypeName : string - the name of the type of chart being used in the experiment.
//		trialCount : Int - the number of trials in the experiment.
//		playLimit : Int (optional) - the max number of times sound clips are allowed to play.

function SonificationExperiment(chartTypeName, trialCount, playLimit) {
	if (!playLimit) { playLimit = 3 };
	
	// CONSTANTS
	this.END_OF_TRIALS = "END_OF_TRIALS";
	
	// DATA
	this.chartTypeName = chartTypeName;
	this.trialCount = trialCount;
	this.trialPosition = -1; // start at practice question
	this.playLimit = playLimit;
	this.orderArray = new Array(this.trialCount);
	this.answerArray = new Array(this.trialCount);
	this.playCountArray = new Array(this.trialCount);
	this.answerTimingArray = new Array(this.trialCount);
	this.demographicsArray = [];
	
	// CONSTRUCTION
	// Fill in play count array with zeros, and fill in trial array
	for (var i = 0; i < this.trialCount; i++) {
		this.playCountArray[i] = 0;
		this.orderArray[i] = i + 1;
	}
	
	// Scramble order array
	this.orderArray = mixArray(this.orderArray);
	
	// METHODS
	this.incrementTrialPosition = function() {
		if (this.trialPosition < this.trialCount) {
			this.trialPosition++;
		}
	}
	this.getNextTrial = function() {
		this.incrementTrialPosition();
		var pos = this.getTrialPos();
		if (pos != this.END_OF_TRIALS) {
			return this.orderArray[this.trialPosition];
		}
	};
	this.getCurrentTrial = function() {
		var pos = this.getTrialPos();
		if (pos != this.END_OF_TRIALS) {
			return this.orderArray[this.trialPosition];
		}
	}
	
	this.saveTrialAnswer = function(index, answer) {
		this.answerArray[index] = answer;
	}
	
	this.getTrialAnswers = function() {
		return this.answerArray;
	}
	
	this.savePlayCount = function(index, playCount) {
		this.playCountArray[index] = playCount;
	}
	
	this.getPlayCount = function(trialNum) {
		if (!trialNum) {trialNum = this.trialPosition;}
		return this.playCountArray[trialNum];
	};
	this.getPlayCountData = function() {
		return this.playCountArray;
	}
	
	this.getPlayLimit = function() {
		return this.playLimit;
	}
	
	this.saveTiming = function(index, timing) {
		this.answerTimingArray[index] = timing;
	}
	this.getTimingData = function() {
		return this.answerTimingArray;
	}
	
	this.getTrialPos = function() {
		if (this.trialPosition >= this.trialCount) {
			return this.END_OF_TRIALS;
		} else {
			return this.trialPosition;
		}
	};
	
	this.getTrialCount = function() {
		return this.trialCount;
	}
	
	this.getChartTypeName = function() {
		return this.chartTypeName;
	};
	
	this.saveDemographics = function(array) {
		this.demographicsArray = array;
	}
	this.getDemographics = function() {
		return this.demographicsArray;
	}
	return true;
}
