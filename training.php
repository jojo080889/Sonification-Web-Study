<?php
	$curPage = "training";
	$nextPage = "experiment";
?>
<?php include 'header.php' ?>
<!DOCTYPE html>
<html>
<head>
	<title>Visualization & Sonification Experiment</title>
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
<h1 id="question_header">Instructions</h1>
<p id="description">
	The graphs you will see in this HIT consist of <b>five</b> bars of varying sizes. The graphs may or may not be accompanied by sound. <b>Two</b> of these bars will be marked by dots. The questions asked will concerned these two marked bars. Take care to answer the questions carefully.
</p>
<p id="previewWarning">This is a PREVIEW. Please accept the HIT first.</p>
<button id="nextTrial" disabled="disabled">Next &gt;</button>

<!-- hidden form to pass values over pages -->
<?php include 'valueform.php' ?>
</body>
</html>
