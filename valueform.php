<?php
	$aID = $_REQUEST['assignmentId'];
	$turkSubmitTo = $_REQUEST['turkSubmitTo'];
	$action = "";
	if ($curPage == "demographics") {
		$action = $turkSubmitTo . "/mturk/externalSubmit";
	} else {
		if ($curPage == "experiment") {
			$nextPage = "demographics";
		}
		$action = $nextPage . ".php?assignmentId=" . $aID . '&turkSubmitTo=' . $turkSubmitTo;
	}
?>
<form id="mturk_form" action="<?= $action ?>" method="post">
	<input type="hidden" id="assignmentId" name="assignmentId" value="<?= $aID ?>" />
	<input type="hidden" id="answerData" name="answerData" value="<?= $_REQUEST['answerData'] ?>" />
	<input type="hidden" id="timingData" name="timingData" value="<?= $_REQUEST['timingData'] ?>" />
	<input type="hidden" id="demographics" name="demographics" value="<?= $_REQUEST['demographics'] ?>" />
</form>
