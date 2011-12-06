<?php
// Shuffle the order of the stages.
$stageOrder = array('pitch', 'duration', 'tempo', 'volume');
shuffle($stageOrder);

$aID = $_REQUEST['assignmentId'];

$curPage = "calibration";
$nextPage = "training";
$stageIndex = -1;
?>

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
<?php include 'progress.php' ?>
<h1 id="question_header">Introduction</h1>
<p id="description">
	This HIT involves answering questions about a series of audio clips. There will be <b>four parts</b> to the HIT. In each part, you will answer questions about a different attribute of sound.<br /><br /> 
	To ensure that you will be able to answer the questions, <b>please wear headphones</b> and listen to the clip below and <b>adjust your volume</b> so that you can comfortably hear each tone being played. Then click Next to begin working on the HIT.
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

<!-- hidden form to move to next page -->
<form id="mturk_form" action="training.php?assignmentId=<?= $aID ?>&chartType=<?= $stageOrder[0] ?>&stageIndex=<?= $stageIndex ?>" method="post">
	<input type="hidden" name="stage0" value="<?= $stageOrder[0] ?>" />
	<input type="hidden" name="stage1" value="<?= $stageOrder[1] ?>" />
	<input type="hidden" name="stage2" value="<?= $stageOrder[2] ?>" />
	<input type="hidden" name="stage3" value="<?= $stageOrder[3] ?>" />
</form>
</body>
</html>
