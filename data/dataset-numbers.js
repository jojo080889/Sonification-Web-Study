// s_i = 10 x 10^{i/12}, i = 0..9
var s = new Array(10);
for (var i = 0; i < 10; i++) {
	s[i] = Math.round(10 * Math.pow(10, i / 12));
}

// approx [10, 12, 15, 18, 22, 26, 32, 38, 46, 56]
// The below arrays are of indices for s. These particular pairs result in all possible ratios. (It's somewhat off because of rounding though.)
var sa = [9, 8, 8, 7, 7, 6, 6, 5, 5, 4];
var sb = [0, 0, 1, 1, 2, 2, 3, 3, 4, 1];
for (var i = 0; i < 10; i++) {
  if (Math.random() >= .5) { // 50% chance that the values of sa[i] and sb[i] will be swapped
    var t = sa[i];
    sa[i] = sb[i];
    sb[i] = t;
  }
}

/* Generate shuffled versions of a pitch array */
// The shuffle function posted by Cristoph.
var shuffle = function(array) {
    var tmp, current, top = array.length;

    if(top) while(--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
    }

    return array;
};

function generateDataArray(pair) {
	//var pairIndex = Math.floor(Math.random()*10); // pick between 0 and 9
	//var pair = [s[sa[pairIndex]], s[sb[pairIndex]]];
	pair.push(Math.floor(Math.random()*91) + 10); // 10 and 100
	pair.push(Math.floor(Math.random()*91) + 10);
	pair.push(Math.floor(Math.random()*91) + 10);
	var shuffled = shuffle([0, 1, 2, 3, 4]);
	
	// generate number array
	var data = new Array(5);
	for (var i = 0; i < 5; i++) {
		data[i] = pair[shuffled[i]];
	}
	
	// generate highlight array
	var highlight = new Array(5);
	for (var i = 0; i < 5; i++) {
		if (shuffled[i] == 0 || shuffled[i] == 1) {
			highlight[i] = true;
		} else {
			highlight[i] = false;
		}
	}
	return [data, highlight];
}

function generateDataset(n) {
	var dataset = new Array(n);
	var highlightset = new Array(n);
	var ratios = [13, 22, 37, 52, 68, 83];
	for (var i = 0; i < 4; i++) { // for each chart type
		for (var j = 0; j < ratios.length; j++) { // for each ratio
			var p = generatePair(ratios[j]);
			var d = generateSimultaneousDataArray(p);
			dataset[i*6 + j] = d[0];
			highlightset[i*6 + j] = d[1];
		}
	}
	return {data: dataset, highlight: highlightset};
}

function generateSimultaneousDataArray(pair) {
	//var pairIndex = Math.floor(Math.random()*10); // pick between 0 and 9
	//var pairA = s[sa[pairIndex]];
	//var pairB = s[sb[pairIndex]];
	//var pair = [pairA, pairB];
	var pairA = pair[0];
	var pairB = pair[1];
	pair.push(Math.floor(Math.random()*91) + 10); // 10 and 100
	pair.push(Math.floor(Math.random()*91) + 10);
	pair.push(Math.floor(Math.random()*91) + 10);
	var data = pair.sort();
	
	// find the pair numbers so you can generate the highlight array.
	// if there are multiple indices that match the pair number, randomly choose between them.
	// pairA
	var pairAIndices = [];
	for (var i = 0; i < 5; i++) {
		if (data[i] == pairA) {
			pairAIndices.push(i);
		}
	}
	var pairAIndex = pairAIndices[Math.floor(Math.random()*(pairAIndices.length))];
	// pairB
	var pairBIndices = [];
	for (var i = 0; i < 5; i++) {
		if (data[i] == pairB) {
			pairBIndices.push(i);
		}
	}
	var pairBIndex = pairBIndices[Math.floor(Math.random()*(pairBIndices.length))];
	
	// generate highlight array
	var highlight = new Array(5);
	for (var i = 0; i < 5; i++) {
		if (i == pairAIndex || i == pairBIndex) {
			highlight[i] = true;
		} else {
			highlight[i] = false;
		}
	}
	return [data, highlight];
}

function generateSimultaneousDataset(n) {
	var dataset = new Array(n);
	var highlightset = new Array(n);
	var ratios = [13, 22, 37, 52, 68, 83];
	for (var i = 0; i < 4; i++) { // for each chart type
		for (var j = 0; j < ratios.length; j++) { // for each ratio
			var p = generatePair(ratios[j]);
			var d = generateSimultaneousDataArray(p);
			dataset[i*6 + j] = d[0];
			highlightset[i*6 + j] = d[1];
		}
	}
	return {data: dataset, highlight: highlightset};
}

function generateRatio() {
	var ratio = Math.floor(Math.random()*77) + 12; // 12 and 88
	var ratioMod = ratio % 5;
	if (ratioMod == 0 || ratioMod == 1 || ratioMod == 4) {
		ratio = generateRatio();
	}
	return ratio;
}

function generatePair(ratio) {
	var x = Math.floor(Math.random()*91) + 10;
	var y = Math.floor(Math.random()*91) + 10;
	var r;
	if (Math.max(x, y) == x) {
		r = Math.round((y / x) * 100);
	} else {
		r = Math.round((x / y) * 100);
	}
	if (r != ratio) {
		return generatePair(ratio);
	}
	return [x, y];
}

/* 12 arrays, for simultaneous data */
/* using generateSimultaneousDataset() */
var sData = [
[15,16,28,32,94],
[11,18,22,32,65],
[15,22,26,26,63],
[18,32,58,71,71],
[14,22,26,64,67],
[12,38,71,79,95],
[10,42,46,46,87],
[15,16,38,46,82],
[19,22,26,33,61],
[10,46,90,99,99],
[18,26,26,55,93],
[12,38,71,88,91],
]

/* 36 arrays, for separate data */
/* using generateDataset() */
var data = [
[22,26,46,36,55],
[41,12,91,90,22],
[38,95,26,18,85],
[46,88,98,10,99],
[30,15,47,11,32],
[46,33,75,86,10],
[55,61,38,15,22],
[32,87,14,34,18],
[10,76,32,81,15],
[26,38,18,53,15],
[17,27,13,10,56],
[56,89,97,91,10],
[15,75,41,32,32],
[12,22,50,60,30],
[15,32,13,65,48],
[26,44,57,22,18],
[91,80,26,12,22],
[27,95,11,32,18],
[22,67,82,11,12],
[98,12,26,38,83],
[68,26,22,35,92],
[29,32,15,66,49],
[17,26,22,25,46],
[46,64,53,34,12],
[38,38,61,43,15],
[62,48,32,22,18],
[94,10,46,58,38],
[18,20,26,43,82],
[29,65,18,39,26],
[25,56,56,87,10],
[12,64,62,73,22],
[18,97,32,22,36],
[87,80,18,26,54],
[10,46,93,80,98],
[22,98,77,68,26],
[46,12,29,87,71],
];

/* 36 arrays. */
/* from http://www.generatedata.com/#generator */
/* Each number is a random integer from 10 to 100 */
/* OLD SET
var dataset = [
[67,63,15,37,99],
[66,66,18,71,28],
[90,20,17,36,88],
[84,23,85,41,51],
[84,53,11,96,40],
[75,95,42,90,44],
[79,57,98,85,84],
[97,50,50,14,20],
[69,94,31,76,30],
[18,60,43,94,91],
[85,78,43,86,74],
[74,61,68,15,50],
[12,85,98,10,69],
[81,97,18,30,11],
[29,89,95,50,65],
[24,59,24,58,52],
[14,42,30,48,28],
[94,21,80,62,27],
[29,64,11,26,65],
[70,98,62,79,27],
[63,99,16,57,48],
[71,72,97,86,30],
[49,90,63,69,38],
[82,62,50,61,23],
[67,81,78,68,98],
[43,38,95,95,17],
[22,57,15,29,14],
[53,91,77,50,76],
[98,90,65,61,58],
[94,42,20,43,93],
[34,10,74,12,69],
[71,45,98,66,39],
[14,79,87,19,98],
[92,63,88,68,13],
[63,66,93,28,26],
[51,22,58,62,56]
] */
