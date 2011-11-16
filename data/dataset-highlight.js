/* Generate an array of size 5 that consist of two "true"s and three "false"s. */
function generateHighlightArray() {
	var array = new Array(5);
	for (var i = 0; i < 5; i++) {
		var num = Math.floor(Math.random()*2); // pick between 0 and 1
		if (num == 0) {
			array[i] = false;
		} else {
			array[i] = true;
		}
	}

	/* check the array has exactly two trues */
	var trueCount = 0;
	for (var i = 0; i < 5; i++) {
		if (array[i]) { trueCount++; }
	}
	
	if (trueCount != 2) {
		return generateHighlightArray();
	} else {
		return array;
	}
}
function generateHighlightDataset(n) {
	var arrayCount = 0;
	var dataset = new Array(n);
	
	for (var i = 0; i < n; i++) {
		dataset[i] = generateHighlightArray();
	}
	
	return dataset;
}
/* 12 arrays, for simultaneous data */
/* from generateSimultaneousDataset(); */
var shighlights = [
[true,false,false,true,false],
[false,true,false,true,false],
[false,true,true,false,false],
[true,true,false,false,false],
[false,true,true,false,false],
[true,true,false,false,false],
[true,false,false,true,false],
[true,false,true,false,false],
[false,true,true,false,false],
[true,true,false,false,false],
[true,true,false,false,false],
[true,true,false,false,false],
]

/* 36 arrays, for separate data*/
/* from generateDataset() */
var highlightset = [
[true,true,false,false,false],
[false,true,false,false,true],
[false,false,true,true,false],
[true,false,false,true,false],
[false,true,false,false,true],
[true,false,false,false,true],
[false,false,true,true,false],
[true,false,false,false,true],
[false,false,true,false,true],
[true,false,true,false,false],
[false,false,false,true,true],
[true,false,false,false,true],
[true,false,false,true,false],
[true,true,false,false,false],
[true,true,false,false,false],
[true,false,false,false,true],
[false,false,false,true,true],
[false,false,false,true,true],
[true,false,false,false,true],
[false,true,false,true,false],
[false,true,true,false,false],
[false,true,true,false,false],
[false,true,true,false,false],
[true,false,false,false,true],
[true,false,false,false,true],
[false,false,true,false,true],
[false,true,true,false,false],
[true,false,true,false,false],
[false,false,true,false,true],
[false,false,true,false,true],
[true,false,false,false,true],
[true,false,true,false,false],
[false,false,true,true,false],
[true,true,false,false,false],
[true,false,false,false,true],
[true,true,false,false,false],
];

/* 36 arrays */
// from generateHighlightDataset
/* OLD SET

var highlightset = [
[false,true,false,false,true],
[false,true,false,false,true],
[false,false,true,false,true],
[false,false,true,false,true],
[true,false,false,true,false],
[false,true,false,false,true],
[true,false,false,true,false],
[false,false,false,true,true],
[false,false,true,false,true],
[false,true,false,true,false],
[false,true,true,false,false],
[false,true,false,false,true],
[true,false,true,false,false],
[true,false,true,false,false],
[false,false,true,false,true],
[false,false,true,false,true],
[true,true,false,false,false],
[true,true,false,false,false],
[true,false,true,false,false],
[false,false,false,true,true],
[false,false,false,true,true],
[true,false,false,true,false],
[true,false,false,true,false],
[false,true,false,false,true],
[true,false,false,false,true],
[false,false,true,true,false],
[false,true,false,false,true],
[true,true,false,false,false],
[true,false,false,true,false],
[true,true,false,false,false],
[false,false,true,false,true],
[true,false,false,true,false],
[true,false,false,true,false],
[true,false,false,true,false],
[true,false,false,false,true],
[false,true,true,false,false]
]*/