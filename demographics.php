<?php
	$curPage = "demographics";
	$nextPage = "";
?>
<?php include 'header.php' ?>
<!DOCTYPE html>
<html>
<head>
	<title>Sonification Experiment</title>
	<link rel="stylesheet" type="text/css" href="experiment.css">
	<script type="text/javascript" src="jquery/jquery-1.7.min.js"></script>
	<script type="text/javascript" src="soundmanager/soundmanager2.js"></script>
	<script type="text/javascript" src="js/SonificationExperiment.js"></script>
	<script type="text/javascript" src="js/soundmanagerSetUp.js"></script>
	<script type="text/javascript" src="js/utility.js"></script>
	<script type="text/javascript" src="js/demographics.js"></script>
</head>
<body>
	<?php include 'progress.php' ?>
	<h1 id="question_header">Almost done!</h1>
	<p id="description">
		Thank you for working on this HIT. Please take a moment to fill out some information about yourself and your thoughts about the sounds you just heard. <b>Your answers have NOT been submitted yet -- please press submit below to finish.</b>
	</p>
	<div id="questions">
		<p class="question">
			What is your age, in years?
			<input type="text" name="ageAnswer" id="ageAnswer" size="3" maxlength="3" />
		</p>
		<p class="question">
			With what gender do you identify?<br />
			<input type="radio" name="genderAnswer" value="m" /> Male<br />
			<input type="radio" name="genderAnswer" value="f" /> Female<br />
			<input type="radio" name="genderAnswer" value="na" /> Prefer not to answer
		</p>
		<p class="question">
			What best describes your level of vision?<br />
			<input type="radio" name="visionAnswer" value="normal" /> Normal or corrected to normal vision<br />
			<input type="radio" name="visionAnswer" value="color" /> Partially or totally colorblind<br />
			<input type="radio" name="visionAnswer" value="low" /> Low vision (cannot be completely corrected by lenses)<br />
			<input type="radio" name="visionAnswer" value="blind" /> Blind<br />
		</p>
		<p class="question">
			Have you ever had any musical training or musical practice?<br />
			<input type="radio" name="musicAnswer" value="yes" /> Yes<br />
			<input type="radio" name="musicAnswer" value="no" /> No<br />
		</p>
		<p class="question">
			What would you say is your musical skill level?<br />
			<input type="radio" name="musicSkillAnswer" value="1" /> 1 (Not very skilled)<br />
			<input type="radio" name="musicSkillAnswer" value="2" /> 2<br />
			<input type="radio" name="musicSkillAnswer" value="3" /> 3<br />
			<input type="radio" name="musicSkillAnswer" value="4" /> 4<br />
			<input type="radio" name="musicSkillAnswer" value="5" /> 5 (Very skilled)<br />
		</p>
	</div>
	<p id="previewWarning">This is a PREVIEW. Please accept the HIT first.</p>
	<button id="nextTrial">Submit</button>
<?php include 'valueform.php' ?>
</body>
</html>
