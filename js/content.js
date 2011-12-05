var chartTypeWords = {
	// practiceOptions format: array of [array of possible options, array of highlighted tones, index of correct percentage], where each index corresponds to the practiceX.mp3 filenames.
	'pitch': {
		attribute: "pitch",
		smallAdj: "lower",
		bigAdj: "higher",
		trialNum: 1,
		practiceNum: 3,
		practiceOptions: [[[80, 93, 78, 22], [1, 4], ["B", 3]], [[3, 83, 21, 15], [2, 4], ["B", 1]], [[37, 98, 83, 72], [2, 3], ["B", 0]]]
	},
	'duration': {
		attribute: "length",
		smallAdj: "shorter",
		bigAdj: "longer",
		trialNum: 36,
		practiceNum: 3,
		practiceOptions: [[[90, 61, 87, 13], [2, 5], ["B", 3]], [[55, 22, 67, 86], [2, 4], ["B", 1]], [[37, 80, 92, 5], [3, 5], ["B", 0]]]
	},
	'tempo': {
		attribute: "speed",
		smallAdj: "slower",
		bigAdj: "faster",
		trialNum: 18,
		practiceNum: 3,
		practiceOptions: [[[10, 68, 99, 96], [2, 3], ["A", 1]], [[83, 73, 37, 4], [1, 4], ["A", 2]], [[52, 1, 80, 98], [2, 4], ["A", 0]]]
	},
	'volume': {
		attribute: "loudness",
		smallAdj: "quieter",
		bigAdj: "louder",
		trialNum: 12,
		practiceNum: 3,
		practiceOptions: [[[3, 98, 10, 52], [2, 3], ["A", 3]], [[10, 5, 68, 8],[3, 5], ["B", 2]], [[90, 37, 84, 79], [4, 5], ["A", 1]]]
	}
};

var content = {
	'demographics': {
		description: "Thank you for working on this HIT. Please take a moment to fill out some information about yourself and your preferences.<b>Your answers have NOT been submitted yet -- please press submit below to finish.</b>", 
		questions: "<p class='question'>What is your age, in years? <input type='text' name='ageAnswer' id='ageAnswer' size='3' maxlength='3'/></p>" + 
		"<p class='question'>With what gender do you identify?<br /><input type='radio' name='genderAnswer' value='m' />Male<br /><input type='radio' name='genderAnswer' value='f' />Female<br /><input type='radio' name='genderAnswer' value='na' />Prefer not to answer</p>" + 
		"<p class='question'>Which best describes your level of vision?<br /><input type='radio' name='visionAnswer' value='normal' />Normal or corrected to normal vision<br /><input type='radio' name='visionAnswer' value='color' />Partially or totally colorblind<br /><input type='radio' name='visionAnswer' value='low' />Low vision (cannot be completely corrected by lenses)<br /><input type='radio' name='visionAnswer' value='blind' />Blind<br /></p>" + 
		"<p class='question'>Have you ever had any musical training or musical practice?<br /><input type='radio' name='musicAnswer' value='yes' />Yes<br /><input type='radio' name='musicAnswer' value='no' />No<br /></p>" + 
		"<p class='question'>What would you say is your musical skill level?<br /><input type='radio' name='musicSkillAnswer' value='1' />1 (Not very skilled)<br /><input type='radio' name='musicSkillAnswer' value='2' />2<br /><input type='radio' name='musicSkillAnswer' value='3' />3<br /><input type='radio' name='musicSkillAnswer' value='4' />4<br /><input type='radio' name='musicSkillAnswer' value='5' />5 (Very skilled)<br /></p>" 
	},
	"instructions": {
		partA: "Play the clip below. You will hear five tones. <b>Remember which two tones are highlighted.</b>",
		partB: "Play the <b>same clip</b> below again. Pay attention to: <ul><li>which highlighted tone is <b>" + chartTypeWords[chartType]['smallAdj'] + "</b>,</li> <li>and what <b>percentage</b> the " + chartTypeWords[chartType]['attribute'] + " of the " + chartTypeWords[chartType]['smallAdj'] + " highlighted tone is of the " + chartTypeWords[chartType]['attribute'] + " of the " + chartTypeWords[chartType]['bigAdj'] + " highlighted tone.</li></ul>" +
		"<p>Go with your <b>gut instinct</b> and try not to make a precise measurement."
	}
}
