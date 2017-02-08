function loadRecords() {
	var cookieValueEasy = document.cookie.replace(/(?:(?:^|.*;\s*)easymode\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	var recordSpanEasy = document.getElementById("easyrecord");
	if (cookieValueEasy) {
		recordSpanEasy.innerHTML = cookieValueEasy + " seconds.";
	} else {
		recordSpanEasy.innerHTML ="no record yet."
	}
	var cookieValueHard = document.cookie.replace(/(?:(?:^|.*;\s*)hardmode\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	var recordSpanHard = document.getElementById("hardrecord");
	if (cookieValueHard) {
		recordSpanHard.innerHTML = cookieValueHard + " seconds.";
	} else {
		recordSpanHard.innerHTML ="no record yet."
	}
}

function clearRecords(){
	document.cookie = "easymode=";
	document.cookie = "hardmode=";
}