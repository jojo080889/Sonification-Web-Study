var aID = $.urlParam('assignmentId');

$(document).ready(function() {

	if (aID == "ASSIGNMENT_ID_NOT_AVAILABLE") {
		$("#previewWarning").css('display', 'block');
	}

	$("#nextTrial").removeAttr("disabled");

	$("#nextTrial").bind('click', function() {
		$("#mturk_form").submit();
	});
});

