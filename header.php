<?php
	$stageIndex = $_REQUEST['stageIndex'];
	if ($curPage == "training") {
		$stageIndex++;
	}
	$curStage = $_REQUEST['stage' . $stageIndex];
?>
