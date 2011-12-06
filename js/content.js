var chartTypeWords = {
	// practiceOptions format: array of [array of possible options, array of highlighted tones, index of correct percentage], where each index corresponds to the practiceX.mp3 filenames.
	'pitch': {
		attribute: "pitch",
		smallAdj: "lower",
		bigAdj: "higher",
		trialNum: 12, //12
		practiceNum: 2, //2
		practiceOptions: [[[80, 93, 78, 22], [1, 4], ["B", 3]], [[3, 83, 21, 15], [2, 4], ["B", 1]], [[37, 98, 83, 72], [2, 3], ["B", 0]]]
	},
	'duration': {
		attribute: "length",
		smallAdj: "shorter",
		bigAdj: "longer",
		trialNum: 18, //18
		practiceNum: 2, //2
		practiceOptions: [[[90, 61, 87, 13], [2, 5], ["B", 3]], [[55, 22, 67, 86], [2, 4], ["B", 1]], [[37, 80, 92, 5], [3, 5], ["B", 0]]]
	},
	'tempo': {
		attribute: "speed",
		smallAdj: "slower",
		bigAdj: "faster",
		trialNum: 18, //18
		practiceNum: 2, //2
		practiceOptions: [[[10, 68, 99, 96], [2, 3], ["A", 1]], [[83, 73, 37, 4], [1, 4], ["A", 2]], [[52, 1, 80, 98], [2, 4], ["A", 0]]]
	},
	'volume': {
		attribute: "loudness",
		smallAdj: "quieter",
		bigAdj: "louder",
		trialNum: 12, //12
		practiceNum: 2, //2
		practiceOptions: [[[3, 98, 10, 52], [2, 3], ["A", 3]], [[10, 5, 68, 8],[3, 5], ["B", 2]], [[90, 37, 84, 79], [4, 5], ["A", 1]]]
	}
};

var content = {
	"instructions": {
		partA: "Play the clip below. You will hear five tones. <b>Remember which two tones are highlighted.</b>",
		partB: "Play the <b>same clip</b> below again. Pay attention to: <ul><li>which highlighted tone is <b>" + chartTypeWords[chartType]['smallAdj'] + "</b>,</li> <li>and what <b>percentage</b> the " + chartTypeWords[chartType]['attribute'] + " of the " + chartTypeWords[chartType]['smallAdj'] + " highlighted tone is of the " + chartTypeWords[chartType]['attribute'] + " of the " + chartTypeWords[chartType]['bigAdj'] + " highlighted tone.</li></ul>" +
		"<p>Go with your <b>gut instinct</b> and try not to make a precise measurement."
	}
}
