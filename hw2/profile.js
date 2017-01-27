var isEmptyInput = function(igElement) {
	var inputElm = igElement.children[1];
	if (inputElm.value == "") {
		return true;
	} else {
		return false;
	}
}

var testInputValidity = function(inputElm) {
	var classList = inputElm.classList;
	if (classList.contains("display-name")) {
		return {
			validity: true,
			display: true,
			info: "You've successfully updated the display name field to " + inputElm.value + ".\n",
			infocolor: "text-success"
		}
	}
	if (classList.contains("email-address")) {
		var myReg = /^[_a-z0-9]+@([_a-z0-9]+\.)+[a-z0-9]{2,3}$/;
		if (myReg.test(inputElm.value)){
			return {
				validity: true,
				display: true,
				info: "You've successfully updated the email address field to " + inputElm.value + ".\n",
				infocolor: "text-success"				
			}
		} else {
			return {
				validity: false,
				display: false,
				info: "Please input valid email address, it should contain @. After @, there should be a valid domain name.\n",
				infocolor: "text-danger"
			}
		}
	}
	if (classList.contains("phone-number")) {
		var myReg = /^\d{3}-\d{3}-\d{4}$/;
		if (myReg.test(inputElm.value)) {
			return {
				validity: true,
				display: true,
				info: "You've successfully updated the email address field to " + inputElm.value + ".\n",
				infocolor: "text-success"
			}
		} else {
			return {
				validity: false,
				display: false,
				info: "The phone number should be in this format XXX-XXX-XXXX, in which X is a digit.\n",
				infocolor: "text-danger"
			}
		}
	}
	if (classList.contains("zipcode")) {
		var myReg = /^\d{5}$/;
		if (myReg.test(inputElm.value)) {
			return {
				validity: true,
				display: true,
				info: "You've successfully updated the zipcode field to " + inputElm.value + ".\n",
				infocolor: "text-success"
			}
		} else {
			return {
				validity: false,
				display: false,
				info: "The zip code should be in XXXXX format, in which X is a digit.\n",
				infocolor: "text-danger"
			}
		}
	}
	if (classList.contains("password")) {
		var pwConElm = document.querySelector(".password-confirmation");
		if (inputElm.value == pwConElm.value) {
			return {
				validity: true,
				display: false,
				info: "You've successfully updated your password to " + inputElm.value + ".\n",
				infocolor: "text-success"
			}
		} else {
			return {
				validity: false,
				display: false,
				info: "Please input two identical passwords.\n",
				infocolor: "text-danger"
			}
		} 
	}
	if (classList.contains("password-confirmation")) {
		var pwElm = inputElm.previousElementSibling;
		if (pwElm.value == "") {
			return {
				validity: false,
				display: false,
				info: "Please input two identical passwords.\n",
				infocolor: "text-danger"
			}
		} else {
			return null;
		}
	}
}


window.onload = function() {

	var btn = document.getElementById("changeBtn");
	btn.addEventListener("click", function(e){
		var igElements = document.getElementsByClassName("input-group");
		var prompt = document.getElementById("prompt");
		// empty previous prompt
		prompt.innerHTML = "";
		[].forEach.call(igElements, function(igElement) {
			if (!isEmptyInput(igElement)) {
				var inputElm = igElement.children[1];
				var test = testInputValidity(inputElm);
				// this if statement is for not-showing-password, password needed to be hidden
				if (test) {
					if (test.validity && test.display) {
						var displayElm = igElement.children[2];
						displayElm.innerHTML = inputElm.value;
					}
					var pElm = document.createElement("p");
					pElm.innerHTML = test.info;
					pElm.classList.add(test.infocolor);
					prompt.appendChild(pElm);
					// if valid filed is updated, empty the field
					if (test.validity) {
						inputElm.value = "";
					}
				}
			}
		});
	})


}