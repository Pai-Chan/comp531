window.onload = function() {
	var btn = document.getElementById("clkBtn");
	var relocater = function(e) {
		// instead of 100, use 90% as the max value to prevent half of the button is out of viewport
		btn.style.left = (Math.random() * 90).toString() + "%";
		btn.style.top = (Math.random() * 90).toString() + "%";
	}
	btn.addEventListener("mouseover", relocater, false);
	
	var keyText1 = "Click Me";
	var keyText2 = "Play Again";

	document.addEventListener("keydown" ,function(e) {
		console.log("you press down a key.");
		if (e.keyCode && e.keyCode === 16) {
			btn.removeEventListener("mouseover", relocater);
		}
	}, false);

	document.addEventListener("keyup", function(e) {
		console.log("you lift up a key.");
		if (e.keyCode && e.keyCode === 16 && btn.innerHTML == keyText1) {
			btn.addEventListener("mouseover", relocater, false);
		}
	}, false);

	var clickPerform = function(e) {
		if (btn.innerHTML == keyText1) {
			btn.innerHTML = keyText2;
			btn.removeEventListener("mouseover", relocater);
			document.getElementById("congra").style.display = "block";
		} else {
			btn.innerHTML = keyText1;
			btn.addEventListener("mouseover", relocater, false);
			var ev = new Event("mouseover", {"bubbles": true, "cancelable": false});
			btn.dispatchEvent(ev);
			document.getElementById("congra").style.display = "none";
		}
	}
	btn.addEventListener("click", clickPerform, false);
}