<?php
	$aID = $_REQUEST['assignmentId'];
	$action = $nextPage . ".php?assignmentId=" . $aID . "&chartType=" . $curStage . '&stageIndex=' . $stageIndex;
	if (stageIndex == 3 && $curPage == "experiment") {
		$nextPage = "demographics";
	} else if ($curPage == "demographics") {
		$action = "https://www.mturk.com/mturk/externalSubmit";
	} else if ($curPage == "experiment") {
		$nextStage = $_REQUEST['stage'.($stageIndex + 1)];
		$action = $nextPage . ".php?assignmentId=" . $aID . "&chartType=" . $nextStage . '&stageIndex=' . $stageIndex;
	}
	$stageArray = array($_REQUEST['stage0'], $_REQUEST['stage1'], $_REQUEST['stage2'], $_REQUEST['stage3']);
?>
<form id="mturk_form" action="<?= $action ?>" method="post">
	<input type="hidden" name="stage0" value="<?= $stageArray[0] ?>" />
	<input type="hidden" name="stage1" value="<?= $stageArray[1] ?>" />
	<input type="hidden" name="stage2" value="<?= $stageArray[2] ?>" />
	<input type="hidden" name="stage3" value="<?= $stageArray[3] ?>" />
	<input type="hidden" id="assignmentId" name="assignmentId" value="<?= $aID ?>" />

	<?php
	for ($i = 0; $i < count($stageArray); $i++) {
		$stageI = $stageArray[$i];
	?>
	<input type="hidden" id="<?= $stageI ?>AnswerData" name="<?= $stageI ?>AnswerData" value="<?= $_REQUEST[$stageI.'AnswerData'] ?>" />
	<input type="hidden" id="<?= $stageI ?>FirstTimingData" name="<?= $stageI ?>FirstTimingData" value="<?= $_REQUEST[$stageI.'FirstTimingData'] ?>" />
	<input type="hidden" id="<?= $stageI ?>SecondTimingData" name="<?= $stageI ?>SecondTimingData" value="<?= $_REQUEST[$stageI.'SecondTimingData'] ?>" />
	<input type="hidden" id="<?= $stageI?>PlaycountData" name="<?= $stageI ?>PlaycountData" value="<?= $_REQUEST[$stageI.'PlaycountData'] ?>" />
	<?php
	}
	?>
	<input type="hidden" id="demographics" name="demographics" value="<?= $_REQUEST['demographics'] ?>" />
</form>
