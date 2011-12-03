var content = {
	'highlight': {
		description: "",
		questions: "<p class='question'>Which tones were highlighted? <label for='toneA' id='toneAlabel'>A </label><select id='toneA'><option value='1'>1st</option><option value ='2'>2nd</option><option value='3'>3rd</option><option value='4'>4th</option><option value='5'>5th</option><option value='unsure'>Not sure</option></select><label for='toneB'>B </label><select id='toneB'><option value='1'>1st</option><option value='2'>2nd</option><option value='3'>3rd</option><option value='4'>4th</option><option value='5'>5th</option><option value='unsure'>Not sure</option></select></p><p class='question'>Which tone is shorter? <select id='shorterTone'><option>A</option><option>B</option><option value='unsure'>Not sure</option></select></p><p class='question'>What percent is the shorter of the longer? <input type='text' size='3' maxlength='3' id='percentAnswer' />% <span id='examples'>For example, if the shorter tone is about 22/100 of the longer tone, enter 22</span><i id='unsureInstructions'>Type '0' if you're unsure</i></p>"
	},
	'demographics': {
		description: "Thank you for working on this HIT. Please take a moment to fill out some information about yourself and your preferences.<b>Your answers have NOT been submitted yet -- please press submit below to finish.</b>", 
		questions: "<p class='question'>What is your age, in years? <input type='text' name='ageAnswer' id='ageAnswer' size='3' maxlength='3'/></p>" + 
		"<p class='question'>With what gender do you identify?<br /><input type='radio' name='genderAnswer' value='m' />Male<br /><input type='radio' name='genderAnswer' value='f' />Female<br /><input type='radio' name='genderAnswer' value='na' />Prefer not to answer</p>" + 
		"<p class='question'>Which best describes your level of vision?<br /><input type='radio' name='visionAnswer' value='normal' />Normal or corrected to normal vision<br /><input type='radio' name='visionAnswer' value='color' />Partially or totally colorblind<br /><input type='radio' name='visionAnswer' value='low' />Low vision (cannot be completely corrected by lenses)<br /><input type='radio' name='visionAnswer' value='blind' />Blind<br /></p>" + 
		"<p class='question'>Have you ever had any musical training or musical practice?<br /><input type='radio' name='musicAnswer' value='yes' />Yes<br /><input type='radio' name='musicAnswer' value='no' />No<br /></p>" + 
		"<p class='question'>What would you say is your musical skill level?<br /><input type='radio' name='musicSkillAnswer' value='1' />1 (Not very skilled)<br /><input type='radio' name='musicSkillAnswer' value='2' />2<br /><input type='radio' name='musicSkillAnswer' value='3' />3<br /><input type='radio' name='musicSkillAnswer' value='4' />4<br /><input type='radio' name='musicSkillAnswer' value='5' />5 (Very skilled)<br /></p><hr />" + 
		"<p>Some of the sound clips you heard used the same pitch for all of its tones (Type 1), while other sound clips used varying pitches that may have been in order (Type 2) or mixed up (Type 3).</p>" +
		"<p>How much did you like or dislike each type?</p>" +
		"<table id='demo_examples'><tr><td><p class='tonelabel'>Same pitch (Type 1)</p><p id='soundclip_samepitch' class='soundclip'><span id='loading'>Loading...</span></p></td>" + 
		"<td><p class='tonelabel'>Ordered pitches (Type 2)</p><p id='soundclip_orderpitch' class='soundclip'><span id='loading'>Loading...</span></p></td>" + 
		"<td><p class='tonelabel'>Mixed pitches (Type 3)</p><p id='soundclip_mixedpitch' class='soundclip'><span id='loading'>Loading...</span></p></td></tr>" +
		"<tr id='preferences'><td><p class='question'>How would you rate Type 1? <br /><input type='radio' name='samePitchPrefer' value='1' />1 (Not preferable)<br /><input type='radio' name='samePitchPrefer' value='2' />2<br /><input type='radio' name='samePitchPrefer' value='3' />3 (Neutral)<br /><input type='radio' name='samePitchPrefer' value='4' />4<br /><input type='radio' name='samePitchPrefer' value='5' />5 (Preferable)<br /></p></td>" + 
		"<td><p class='question'>How would you rate Type 2? <br /><input type='radio' name='orderPitchPrefer' value='1' />1 (Not preferable)<br /><input type='radio' name='orderPitchPrefer' value='2' />2<br /><input type='radio' name='orderPitchPrefer' value='3' />3 (Neutral)<br /><input type='radio' name='orderPitchPrefer' value='4' />4<br /><input type='radio' name='orderPitchPrefer' value='5' />5 (Preferable)<br /></p></td>" + 
		"<td><p class='question'>How would you rate Type 3? <br /><input type='radio' name='mixedPitchPrefer' value='1' />1 (Not preferable)<br /><input type='radio' name='mixedPitchPrefer' value='2' />2<br /><input type='radio' name='mixedPitchPrefer' value='3' />3 (Neutral)<br /><input type='radio' name='mixedPitchPrefer' value='4' />4<br /><input type='radio' name='mixedPitchPrefer' value='5' />5 (Preferable)<br /></p></td></tr></table>" 
	},
	"practice1": {
		percentage: "What percent is the shorter of the longer?<br />" +
		"<span id='examples'>For example, if the shorter tone is <sup>1</sup>&frasl;<sub>4</sub> as long as the longer tone, pick '25%'.</span>" +
		"<input type='radio' name='practiceAnswer' value='90' />90%<br />" + 
		"<input type='radio' name='practiceAnswer' value='61' />61%<br />" + 
		"<input type='radio' name='practiceAnswer' value='87' />87%<br />" + 
		"<input type='radio' name='practiceAnswer' value='13' />13%<br />"
	},
	"practice2": {
		percentage: "What percent is the shorter of the longer?<br />" +
		"<span id='examples'>For example, if the shorter tone is <sup>1</sup>&frasl;<sub>4</sub> as long as the longer tone, pick '25%'.</span>" +
		"<input type='radio' name='practiceAnswer' value='55' />55%<br />" + 
		"<input type='radio' name='practiceAnswer' value='22' />22%<br />" + 
		"<input type='radio' name='practiceAnswer' value='67' />67%<br />" + 
		"<input type='radio' name='practiceAnswer' value='86' />86%<br />"
	},
	"practice3": {
		percentage: "What percent is the shorter of the longer?<br />" +
		"<span id='examples'>For example, if the shorter tone is <sup>1</sup>&frasl;<sub>4</sub> as long as the longer tone, pick '25%'.</span>" +
		"<input type='radio' name='practiceAnswer' value='37' />37%<br />" + 
		"<input type='radio' name='practiceAnswer' value='80' />80%<br />" + 
		"<input type='radio' name='practiceAnswer' value='92' />92%<br />" + 
		"<input type='radio' name='practiceAnswer' value='5' />5%<br />"
	},
	"instructions": {
		partA: "Play the clip below. You will hear five tones. <b>Remember which two tones are highlighted.</b>",
		partB: "Play the <b>same clip</b> below again. Pay attention to: <ul><li>which highlighted tone is <b>shorter</b>,</li> <li>and what <b>percentage</b> the length of the shorter highlighted tone is of the length of the longer highlighted tone.</li></ul>" +
		"<p>Go with your <b>gut instinct</b> and try not to make a precise measurement."
	}
}
