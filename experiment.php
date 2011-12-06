<?php include 'header.php' ?>
<?php
	$curPage = 'experiment';
	$nextPage = 'training';
?>
<!DOCTYPE html>
<html>
<head>
	<title>Sonification Experiment</title>
	<link rel="stylesheet" type="text/css" href="experiment.css" />
	<script type="text/javascript" src="jquery/jquery-1.7.min.js"></script>
	<script type="text/javascript" src="soundmanager/soundmanager2.js"></script>
	<script type="text/javascript" src="js/SonificationExperiment.js"></script>
	<script type="text/javascript" src="js/soundmanagerSetUp.js"></script>
	<script type="text/javascript" src="js/utility.js"></script>
	<script type="text/javascript" src="js/experiment.js"></script>
	<script type="text/javascript" src="js/content.js"></script>
</head>
<body>
<?php include 'progress.php' ?>
<h1 id="question_header">Question 1 out of 24</h1>
<h2 id="part_header">Part A</h2>
<p id="description">
</p>
<p id="playInfo">
You can only listen to the clip once.
</p>
<p id="soundclip" class="soundclip">
	<span id="loading">Loading...</span>
</p>
<div id="questions">
	<p id='whichHighlight' class='question'>Which tones were highlighted? 
		<label for='toneA' id="toneAlabel"></label>
		<select id='toneA'>
			<option value="noAnswer"></option>
			<option value="1">1st</option>
			<option value="2">2nd</option>
			<option value="3">3rd</option>
			<option value="4">4th</option>
			<option value="5">5th</option>
			<option value="unsure">Not sure</option>
		</select>
		<label for='toneB'></label>
		<select id='toneB'>
			<option value="noAnswer"></option>
			<option value="1">1st</option>
			<option value="2">2nd</option>
			<option value="3">3rd</option>
			<option value="4">4th</option>
			<option value="5">5th</option>
			<option value="unsure">Not sure</option>
		</select>
	</p>
	<p id='whichShorter' class='question'>Which highlighted tone is <span class="smallAdj">shorter</span>? 
		<select id='shorterTone'>
			<option value="noAnswer"></option>
			<option value="A">First highlighted tone</option>
			<option value="B">Second highlighted tone</option>
			<option value="unsure">Not sure</option>
		</select>
	</p>
	<p id='percentage' class='question'>What percent is the <span class="smallAdj">shorter</span> of the <span class="bigAdj">longer</span>?
		<input type="text" id="percentAnswer" size="3" maxLength="3" />%
		<span id="examples">For example, if the <span class="smallAdj">shorter</span> tone is <sup>1</sup>&frasl;<sub>4</sub> the <span class="chartAttribute">length</span> of the <span class="bigAdj">longer</span> tone, enter '25'.</span>
		<i id='unsureInstructions'>Type '0' if you're unsure</i>
	</p>
</div>
<p id="previewWarning">This is a PREVIEW. Please accept the HIT first.</p>
<button id="nextTrial" disabled="disabled">Next &gt;</button>

<!-- hidden form to pass values/submit answers -->
<?php include 'valueform.php' ?>
</body>
</html>
