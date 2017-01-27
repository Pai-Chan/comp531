window.onload = function() {
	var picIndexInc = 0;
	var imgs = document.getElementsByTagName("img");
	var intervalAction = function(imgNode) {
		var period = Math.random() * 4000 + 1000;
		var myInterval = setInterval(function() {changePic(imgNode)}, period);
		function changePic(imgNode) {
			var re = /.+?(\d+).jpg/;
			var picNumStr = imgNode.src.match(re)[1];
			var picNum = parseInt(picNumStr);
			imgNode.src.match(picNum);
			var nextPicNum = picNum % 2 == 1 ? picNum + 1 : picNum - 1;
			imgNode.src = "img/p" + nextPicNum + ".jpg";
		}
		imgNode.setAttribute("data-intervalid", myInterval);
	};

	[].forEach.call(imgs, intervalAction);

	var btns = document.querySelectorAll(".panel-body button");
	[].forEach.call(btns, function(btnNode) {
		btnNode.addEventListener("click", function(e) {
			
			if (btnNode.innerHTML == "Stop") {
				var img = btnNode.nextElementSibling;
				var imgIntervalId = img.getAttribute("data-intervalid");
				clearInterval(imgIntervalId);
				btnNode.innerHTML = "Start";
				btnNode.classList.remove("btn-warning");
				btnNode.classList.add("btn-success");
			} else {
				var img = btnNode.nextElementSibling;
				intervalAction(img);
				btnNode.innerHTML = "Stop";
				btnNode.classList.remove("btn-success");
				btnNode.classList.add("btn-warning");				
			}

		});
	});
}