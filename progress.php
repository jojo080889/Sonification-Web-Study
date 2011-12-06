<?php
if ($curPage == "calibration") {
	$stage0 = ucfirst($stageOrder[0]);
	$stage1 = ucfirst($stageOrder[1]);
	$stage2 = ucfirst($stageOrder[2]);
	$stage3 = ucfirst($stageOrder[3]);
} else {
	$stage0 = ucfirst($_REQUEST['stage0']);
	$stage1 = ucfirst($_REQUEST['stage1']);
	$stage2 = ucfirst($_REQUEST['stage2']);
	$stage3 = ucfirst($_REQUEST['stage3']);
}

$highlightText = " class='current' ";
?>
<ul id="progress_bar">
	<li <?php if($curPage == "calibration") { echo $highlightText; } ?>>Intro</li>
	<li <?php if($stageIndex == 0) { echo $highlightText; } ?>><?= $stage0 ?></li>
	<li <?php if($stageIndex == 1) { echo $highlightText; } ?>><?= $stage1 ?></li>
	<li <?php if($stageIndex == 2) { echo $highlightText; } ?>><?= $stage2 ?></li>
	<li <?php if($stageIndex == 3) { echo $highlightText; } ?>><?= $stage3 ?></li>
	<li <?php if($curPage == "demographics") { echo $highlightText; } ?>>Done</li>
</ul>
