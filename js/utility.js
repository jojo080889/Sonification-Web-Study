/* Utility */
// Randomly scramble the contents of an array.
// source: http://firelitdesign.blogspot.com/2011/08/javascript-array-scrambling.html
function mixArray(arr) {
	var arrayOut = [];
	var origLength = arr.length;
	for (var i = 0; i < origLength; i++) {
		var randIndex = Math.floor(Math.random()*arr.length);
		if (randIndex == arr.length) randIndex--;
		arrayOut.push(arr.splice(randIndex, 1)[0]);
	}
	return arrayOut;
};

// get URL parameters through javascript
// source: http://snipplr.com/view/26662/get-url-parameters-with-jquery--improved/
$.urlParam = function(name){
	var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (!results) { return 0; }
	return results[1] || 0;
};

function fillInQuestionText() {
	$(".smallAdj").html(chartTypeWords[chartType]['smallAdj']);
	$(".bigAdj").html(chartTypeWords[chartType]['bigAdj']);
	$(".chartAttribute").html(chartTypeWords[chartType]['attribute']);
}
