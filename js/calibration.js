var previousWorkers = [
"A38L1QCI94USEJ",
"A2RAJ9IKPQZQBO",
"A1KWJYE4Q879RD",
"A2GM49COOXSIP8",
"A3S33282Z4CS54",
"AR8NHXRTCZE0F",
"A31Q234APFP1D4",
"A1FC4FQNJ2X0D7",
"AMIAE0BCSITRA",
"A1B5SSGMTAQ9B5",
"A1D2UHFZWI5PWA",
"A1ED0EF8ITB01C",
"A1FC4FQNJ2X0D7",
"A1G94QON7A9K0N",
"A1HKD79XQ8NYNJ",
"A1KWJYE4Q879RD",
"A1OD9OA9B34FL",
"A1P9FTZGEB2LUC",
"A1Q9VNGG70F01I",
"A1ZBCPFZH8XT7X",
"A1ZIMBRVL14FBF",
"A213IRVYGO0IJ8",
"A21F2N8KRUFPSX",
"A226I1MXOXWW40",
"A29NFET1AJRDE3",
"A2D0E6OE7R9C37",
"A2GM49COOXSIP8",
"A2NWIKWCQ65ZP4",
"A2PD1ZAY6J7PQ8",
"A2RAJ9IKPQZQBO",
"A2RPII0OB1PREU",
"A2SEX3DV2KZHSU",
"A2SKPF8W2LCJ0X",
"A2U15CFFIID1QR",
"A2U8P3Z4VFMUJ5",
"A2VPCQODOWHSP8",
"A2XUHJXL1X5CDO",
"A2ZEUX7P811E8U",
"A31Q234APFP1D4",
"A36G300AK9F4PF",
"A36LJB1K02SL3U",
"A3729RXE5KHSCV",
"A38L1QCI94USEJ",
"A3A2ARO05RMMO8",
"A3AVZHEIMSKFD3",
"A3E5F2MJ6P9XEF",
"A3EVLN2XFM8MMF",
"A3EVR7FOPM6EA0",
"A3F5YRZ24MRXR9",
"A3FJE9AUW0O41D",
"A3GMU8DFHE6F7Q",
"A3HKHSGP3R6SJ3",
"A3LOSB4V9UABSZ",
"A3OAH79RXM77YV",
"A3QZB166Q9P1HF",
"A3S33282Z4CS54",
"A88XXN3BWMTVD",
"A8B4AE3QMECV",
"AG9ADPVEL2574",
"AGW2ERGPI9Z30",
"AHDW0M4017Z8K",
"AI850P4LLVN5O",
"AM709YJWYALBK",
"AMIAE0BCSITRA",
"AO83CBT686WGV",
"AR599M3COR0NU",
"AR8NHXRTCZE0F",
"ATD029XAZ4TGZ",
"AUNCRNSLKXRSB",
"AV79PLTCG08O1",
"AVDBO2896RBS3",
"AWE8DF2ZY0LB2",
"AX92Z8EH3K0YC",
"AXHPSV2V91729"
]

$(document).ready(function() {
	var aID = $.urlParam('assignmentId');
	var workerID = $.urlParam('workerId');
	var chartType = $.urlParam('chartType');

	if ($.inArray(workerID, previousWorkers) != -1) {
		$("body").html("<h1>DO NOT ACCEPT THIS HIT</h1>" + "You are seeing this message because you have previously worked on our sound study HITs in the past. For various reasons, we cannot accept work from Turkers who have previously done a sound study for us. If you accept this HIT, we will have to automatically reject your submission. Sorry!");
		return false;
	}

	if (aID == "ASSIGNMENT_ID_NOT_AVAILABLE") {
		$("#previewWarning").css('display', 'block');
	}

	$("#calibrationAnswer").bind('keyup', function() {
		if ($.trim($("#calibrationAnswer").val()) != "") {
			$("#nextTrial").removeAttr("disabled");
		} else {
			$("#nextTrial").attr("disabled", "disabled");
		}
	});

	$("#nextTrial").bind('click', function() {
		var validAnswers = validateCalibration();
		if (validAnswers) {
			$("#mturk_form").submit();
		}
	});
	
	// set up sound stuff
	soundManager.onready(function() {
		mySoundID = 'calibration';
		mySound = soundManager.createSound({
			id: mySoundID,
			url: 'sounds/calibration.mp3',
			autoLoad: true,
			onload: function() {
				$("#loading").hide();
			}
		});

		bindPlayLink("#soundclip", mySound);
	});
});

function validateCalibration() {
	// make sure user enters the right number
	var ans = $("#calibrationAnswer").val();
	if ($.trim(ans) == "") {
		alert("Please enter an answer!");
		return false;
	} else if (ans != 5) { // hard coded answer
		alert("That is not correct. Please try again.");
		return false;
	} else {
		return true;
	}
}
