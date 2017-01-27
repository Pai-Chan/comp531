window.onload = function() {
	var isEmpty = function(igElement) {
		var inputElm = igElement.children.firstChild.nextElementSibling;
		if (inputElm.value == "") {
			return true;
		} else {
			return false;
		}
	}

	var btn = document.getElementById("changeBtn");
	btn.addEventListener("click", function(e){
		var igElements = document.getElementsByClassName("input-group");
		[].forEach.call(igElements, function(ie) {
			console.log(isEmpty(this));
		});
	})


}