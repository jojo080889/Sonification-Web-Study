<?php
	$stageIndex = $_REQUEST['stageIndex'];
	if ($curPage == "training" || $curPage == "demographics") {
		$stageIndex++;
	}
	if ($stageIndex < 4) {
		$curStage = $_REQUEST['stage' . $stageIndex];
	}
?>
