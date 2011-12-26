<?php include 'header.php' ?>
<?php
	$curPage = "practice";
	$nextPage = "experiment";
?>
<!DOCTYPE html>
<html>
<head>
	<title>Visualization & Sonification Experiment</title>
	<link rel="stylesheet" type="text/css" href="experiment.css" />
	<link rel="stylesheet" type="text/css" href="graph.css" />
	<script type="text/javascript" src="jquery/jquery-1.7.min.js"></script>
	<script type="text/javascript" src="soundmanager/soundmanager2.js"></script>
	<script type="text/javascript" src="js/SonificationExperiment.js"></script>
	<script type="text/javascript" src="js/soundmanagerSetUp.js"></script>
	<script type="text/javascript" src="js/utility.js"></script>
	<script type="text/javascript" src="js/data.js"></script>
	<script type="text/javascript" src="js/graph.js"></script>
	<script type="text/javascript" src="js/practice.js"></script>
</head>
<body>
<?php include 'progress.php' ?>
<h1 id="question_header">Practice Question 1 out of 3</h1>
<p id="description">
	Answer the questions about the <b>two marked bars</b> in the graph below. Go with your <b>gut instinct</b> and try not to make a precise measurement. You will have <b>20 seconds</b> to view the graph before answering the questions.
</p>
<p id="countdown_desc">
	<b id="countdown">20</b> seconds until the questions appear...
</p>
<div id="graph">
	<span id="loadinggraph">Loading...</span>
	<div class="bar" style="left: 20px">
		<span class="mark"></span>	
	</div>
	<div class="bar" style="left: 70px">
		<span class="mark"></span>
	</div>
	<div class="bar" style="left: 120px">
		<span class="mark"></span>
	</div>
	<div class="bar" style="left: 170px">
		<span class="mark"></span>	
	</div>
	<div class="bar" style="left: 220px">
		<span class="mark"></span>	
	</div>

	<div class="label" style="left: 20px">1</div>
	<div class="label" style="left: 70px">2</div>
	<div class="label" style="left: 120px">3</div>
	<div class="label" style="left: 170px">4</div>
	<div class="label" style="left: 220px">5</div>
</div>
<div id="questions">
	<p id='whichSmaller' class='question'>Which marked bar is smaller? 
		<select id='smallerBar'>
			<option value="noAnswer"></option>
			<option value="1">Bar 1</option>
			<option value="2">Bar 2</option>
			<option value="3">Bar 3</option>
			<option value="4">Bar 4</option>
			<option value="5">Bar 5</option>
		</select>
	</p>
	<p id="percentage" class='question'>
		What percent is the smaller of the bigger?<br />
		<span id="examples">For example, if the smaller bar is only <sup>1</sup>&frasl;<sub>4</sub> the size of the bigger bar, enter '25'.</span>
		<span id="practiceOptions">
		<input type="radio" name="practiceAnswer" id="practiceAnswer1" value="55"><label id="practiceAnswerLabel1" for="practiceAnswer1">55%</label><br />
		<input type="radio" name="practiceAnswer" id="practiceAnswer2" value="22"><label id="practiceAnswerLabel2" for="practiceAnswer2">22%</label><br />
		<input type="radio" name="practiceAnswer" id="practiceAnswer3" value="67"><label id="practiceAnswerLabel3" for="practiceAnswer3">67%</label><br />
		<input type="radio" name="practiceAnswer" id="practiceAnswer4" value="86"><label id="practiceAnswerLabel4" for="practiceAnswer4">86%</label><br />
		</span>
	</p>
</div>
<p id="previewWarning">This is a PREVIEW. Please accept the HIT first.</p>
<button id="nextTrial" disabled="disabled">Next &gt;</button>
<span id="incorrectMessage">
	Some of your responses were incorrect. Please try again.<br />
	Since this is a practice question, you can <span id="try_again">click here</span> to view the graph again.
</span>

<!-- hidden form to move to next page -->
<?php include 'valueform.php' ?>
</body>
</html>
