<!DOCTYPE html>
<html>
<head>
	<title>Sonification Experiment</title>
	<link rel="stylesheet" type="text/css" href="experiment.css" />
	<script type="text/javascript" src="soundmanager/soundmanager2.js"></script>
	<script type="text/javascript" src="jquery/jquery-1.7.min.js"></script>
	<script type="text/javascript" src="js/soundmanagerSetUp.js"></script>
	<script type="text/javascript" src="js/utility.js"></script>
	<script type="text/javascript" src="js/calibration.js"></script>
</head>
<body>

<h1 id="question_header">Introduction</h1>
<p id="description">
	This HIT involves answering questions about a series of audio clips. To ensure that you will be able to answer the questions, <b>please wear headphones</b> and listen to the clip below and <b>adjust your volume</b> so that you can comfortably hear each tone being played. Then click Next to begin working on the HIT.
</p>
<p id="flashWarning">
	You will need to install <a href="http://http://get.adobe.com/flashplayer/">Adobe Flash Player</a> to complete this HIT.
</p>
<p id="soundclip" class="soundclip">
	<span id="loading">Loading...</span>
</p>
<div id="questions">
	<p class='question'>How many tones did you hear? <input type='text' size='1' maxlength='1' id='calibrationAnswer' /></p>
</div>
<p id="previewWarning">This is a PREVIEW. Please accept the HIT first.</p>
<button id="nextTrial" disabled="disabled">Next &gt;</button>
</body>
</html>
