<?php
	$curPage = "training";
	$nextPage = "practice";
?>
<?php include 'header.php' ?>
<!DOCTYPE html>
<html>
<head>
	<title>Sonification Experiment</title>
	<link rel="stylesheet" type="text/css" href="experiment.css" />
	<script type="text/javascript" src="soundmanager/soundmanager2.js"></script>
	<script type="text/javascript" src="jquery/jquery-1.7.min.js"></script>
	<script type="text/javascript" src="js/soundmanagerSetUp.js"></script>
	<script type="text/javascript" src="js/utility.js"></script>
	<script type="text/javascript" src="js/training.js"></script>
	<script type="text/javascript" src="js/content.js"></script>
</head>
<body>
<?php include 'progress.php' ?>
<h1 id="question_header"><?= ucfirst($curStage) ?> Stage: Instructions</h1>
<p id="description">
	The sound clips you will hear in this stage of the HIT consist of <b>five</b> tones of varying <b><span class="chartAttribute">duration and/or pitch</span></b>.
	<b>Two</b> of these tones will be "highlighted". The highlighted tones will have a large amount of "fuzzy" noise playing in the background.<br /><br />
	Below are examples of the normal tones and highlighted tones you will hear. Once you have listened to the examples, you will be able to click Next.
</p>
<p class="tonelabel">Normal tone </p>
<p id="soundclip_normal" class="soundclip">
	<span id="loading">Loading...</span>
</p>
<p class="tonelabel">Highlighted Tone</p>
<p id="soundclip_highlight" class="soundclip">
	<span id="loading">Loading...</span>
</p>
<div id="pitch_instructions">
	<p>
	The five tones may either be separated with <b>silence</b> or separated using <b>sliding transitions</b>. Below are examples of the different types of sound clips you will hear:
	</p>
	<p class="tonelabel">Tones separated by silence</p>
	<p id="soundclip_pitch_silence" class="soundclip">
		<span id="loading">Loading...</span>
	</p>
	<p class="tonelabel">Tones separated with sliding transitions</p>
	<p id="soundclip_pitch_transitions" class="soundclip">
		<span id="loading">Loading...</span>
	</p>
</div>
<div id="questions">
</div>
<p id="previewWarning">This is a PREVIEW. Please accept the HIT first.</p>
<button id="nextTrial" disabled="disabled">Next &gt;</button>

<!-- hidden form to pass values over pages -->
<?php include 'valueform.php' ?>
</body>
</html>
