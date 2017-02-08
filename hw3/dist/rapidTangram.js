function introduceGame(){
	var width = 800;
	var height = 600;
	var svg = d3.select("#svgcontainer").append("svg")
			.attr("width", width)
			.attr("height", height);
	var dataset = [
		"Tangram is honored as one of the four greatest traditional game in ancient China.",
		"The tools used in Tangram are seven plates with different shape.",
		"Originally, people made up interesting patterns with imagination.",
		"Here, we challenge you to make up a specifc pattern as fast as possible.",
		"The resultant pattern will be shown at the lower right corner.",
		"You should drag the plates to form an identical pattern.",
		"If you drag the plate up out of the upper boundary and then drag back, it'll rotate by 45 degrees counter-clockwisely.",
		"A timer will record how much time you spend in the game.",
		"Once you finish, click [ Finish ] to freeze the timer and get your performance.",
		"You can choose [ easy ] or [ hard ] mode after you click [ I see ].",
	]
	var color = d3.scaleOrdinal(d3.schemeCategory10);
	svg.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.attr("x", 20)
		.attr("y", function(d, i){
			return 60 + 20 *i;
		})
		.attr("dx", 0)
		.attr("dy", 0)
		.attr("fill", function(d, i){
			return color(i);
		})
		.text(function(d, i){
			return d;
		});
	svg.append("text")
		.attr("x", 100)
		.attr("y", function(d, i){
			return 30 + 200;
		})
		.attr("dx", 40)
		.attr("dy", 40)
		.attr("fill", "gray")
		.text("[ I see ]")
		.on("mouseover", function(d){
			d3.select(this).attr("fill", "black");
			d3.select(this).attr("stroke", "black");
		})
		.on("mouseout", function(d){
			d3.select(this).attr("fill", "gray");
			d3.select(this).attr("stroke", "none");
		})
		.on("click", function(d){
			selectDifficulty(svg, width, height);
		})

}

function selectDifficulty(svg, width, height){
	svg.selectAll("text").remove()
	var dataset = [
		{
			textshown: "[ Easy ]",
			textcolor: "green",
			textparam: "easy"
		},
		{
			textshown: "[ Hard ]",
			textcolor: "red",
			textparam: "hard"
		}
	]
	svg.selectAll("text")
		.data(dataset)
		.enter()
		.append("text")
		.attr("x", 100)
		.attr("y", function(d, i){
			return 150 + 50 * i;
		})
		.attr("fill", function(d){
			return d.textcolor;
		})
		.text(function(d){
			return d.textshown;
		})
		.on("mouseover", function(d){
			d3.select(this).attr("stroke", "black");
		})
		.on("mouseout", function(d){
			d3.select(this).attr("stroke", "none");
		})
		.on("click", function(d){
			gameProcess(svg, d.textparam, width, height);
		})		
	svg.append("text")
		.attr("x", 100)
		.attr("y", 100)
		.attr("fill", "blue")
		.text("Please choose one difficulty level:")
}

function gameProcess(svg, mode, width, height){
	svg.selectAll("text").remove()
	var dataset = [
		{
			x: 0,
			y: 0, 
			points: "0,0 50,50 0,100", 
			centroidX: 16.667, 
			centroidY: 50, 
			rotateAngle: 0,
			rotateEnable: true,
			filledColor: "red",
			id: "plate1"
		},
		{
			x: 50,
			y: 100,
			points: "50,0 100,50 0,50",
			centroidX: 50,
			centroidY: 33.333,
			rotateAngle: 0,
			rotateEnable: true,
			filledColor: "orange",
			id: "plate2"
		},
		{
			x: 0,
			y: 0,
			points: "0,0 200,0 100,100",
			centroidX: 100,
			centroidY: 33.333,
			rotateAngle: 0,
			rotateEnable: true,
			filledColor: "green",
			id: "plate3"
		},
		{
			x: 100,
			y: 0,
			points: "100,0 100,200 0,100",
			centroidX: 66.667,
			centroidY: 100,
			rotateAngle: 0,
			rotateEnable: true,
			filledColor: "brown",
			id: "plate4"
		},
		{
			x: 0,
			y: 100,
			points: "0,0 100,100 0,100",
			centroidX: 33.333,
			centroidY: 66.667,
			rotateAngle: 0,
			rotateEnable: true,
			filledColor: "pink",
			id: "plate5"
		},
		{
			x: 0,
			y: 50,
			points: "50,0 100,50 50,100 0,50",
			centroidX: 50,
			centroidY: 50,
			rotateAngle: 0,
			rotateEnable: true,
			filledColor: "blue",
			id: "plate6"
		},
		{
			x: 50,
			y: 150,
			points: "0,0 100,0 150,50 50,50",
			centroidX: 75,
			centroidY: 25,
			rotateAngle: 0,
			rotateEnable: true,
			filledColor: "purple",
			id: "plate7"
		}
	];
	var gAll = svg.append("g").attr("transform", "translate(10,10)");

	// to add seven plates
	var gSeven = gAll.selectAll("g")
				.data(dataset)
				.enter()
				.append("polygon")
				.attr("points", function(d, i){
					return d.points;
				})
				.attr("transform", function(d, i){
					return "translate("+d.x+","+d.y+")"+" "+"rotate("+d.rotateAngle+","+d.centroidX+","+d.centroidY+")";
				})
				.attr("fill", function(d, i){
					return d.filledColor;
				})
				.attr("stroke", "black")
				.attr("stroke-width","2")
				.attr("id", function(d){
					return d.id;
				})
				.call(d3.drag()
					.on("start", dragstarted)
					.on("drag", dragged)
					.on("end", dragended))

	// to add a timer and a drag counter and a rotation counter
	var metricsTools = [
		{
			metricsName: "Timer(Seconds):",
			meticsInitValue: "0",
			idValue: "timer"
		},
		{
			metricsName: "Drag Counter(Times):",
			meticsInitValue: "0",
			idValue: "drag-counter"			
		},
		{
			metricsName: "Rotation Counter(Times):",
			meticsInitValue: "0",
			idValue: "rotation-counter"			
		}
	];

	var metrics = svg.selectAll("text")
					.data(metricsTools)
					.enter()
					.append("text")
					.attr("x", width - 200)
					.attr("y", function(d ,i){
						return 20 + 20 * i;
					})
					.attr("fill", "blue")
					.text(function(d){
						return d.metricsName + " " + d.meticsInitValue;
					})
					.attr("id", function(d){
						return d.idValue;
					});

	var timer = d3.interval(function(elapsed){
		var timerTextData = svg.select("#timer").text().split(" ");
		var metricsName = timerTextData[0];
		var seconds = parseInt(timerTextData[1]);
		seconds += 1;
		svg.select("#timer").text(metricsName + " " + seconds)
	}, 1000);
	// to add [ Finish ] text or rather finish button
	var finishText = svg.append("text")
						.attr("x", 20)
						.attr("y", height - 20)
						.attr("fill", "red")
						.text("[ Finish ]")
						.on("mouseover", function(d){
							d3.select(this).attr("stroke", "red");
						})
						.on("mouseout", function(d){
							d3.select(this).attr("stroke", "none");
						})
						.on("click", function(d){
							if (checkPattern(mode)){
								timer.stop();
								var timerShot = d3.select("#timer").text().split(" ")[1];
								var dragCounterShot = d3.select("#drag-counter").text().split(" ")[2];
								var RotationCounterShot = d3.select("#rotation-counter").text().split(" ")[2];
								d3.select(this).text("You got it. Your performance: " + timerShot + " seconds spent, " +
									dragCounterShot + " drags and " + RotationCounterShot + " rotations.");
								//if it is the best performance, set the new performance into cookies.
								if (mode == "easy") {
									var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)easymode\s*\=\s*([^;]*).*$)|^.*$/, "$1");
								} else{
									var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)hardmode\s*\=\s*([^;]*).*$)|^.*$/, "$1");
								}
								var cookieValueInt = parseInt(cookieValue);
								if (!cookieValueInt || cookieValueInt > timerShot) {
									if (mode == "easy")	{
										document.cookie = "easymode=" + timerShot;
									} else{
										document.cookie = "hardmode=" + timerShot;
									}
									loadRecords();
								}
							} else {
								d3.select(this).text("[ Finish ] Not the correct pattern. Adjust the plates and click again.");
							}
						});

	// to add [ Return ] text or rather return button
	var finishText = svg.append("text")
						.attr("x", width - 85)
						.attr("y", height - 20)
						.attr("fill", "green")
						.text("[ Return ]")
						.on("mouseover", function(d){
							d3.select(this).attr("stroke", "green");
						})
						.on("mouseout", function(d){
							d3.select(this).attr("stroke", "none");
						})
						.on("click", function(d){
							timer.stop();
							var container = document.getElementById("svgcontainer")
							container.removeChild(container.firstChild);
							introduceGame();
						});

	//to add the small resultant pattern
	if (mode == "easy") {
		var gSilhouette = gAll.append("polygon")
					.attr("points", "0,-43.2843 7.0711,-36.2132 0,-36.2132 5,-31.2132 0,-31.2132 \
									5,-26.2132 -5,-26.2132 0,-21.2132 3.5355,-21.2132 3.5355,-14.1421 \
									0,-14.1421 14.1421,0 -14.1421,0 0,-14.1421 -3.5355,-14.1421 \
									-3.5355,-21.2132 -10,-21.2132 -12.5,-26.2132 -5,-26.2132 \
									0,-31.2132 -5,-31.2132 0,-36.2132 -7.0711,-36.2132 0,-43.2843"
						)
					.attr("transform", "translate("+width*0.9+","+height*0.9+")")
					.attr("fill", "gray");
	}
	if (mode == "hard") {
		var gSilhouette = gAll.append("polygon")
					.attr("points", "4,1.5 15,1.5 15,11.5 13.3,10.2 12.2,10.3 22.2,20.3 \
									22.2,24.7 27.3,19.6 27.3,29.6 22.2,34.7 17.5,30 13.6,34.1 \
									13.6,41.4 6.4,41.4 12.5,35 7.5,30 12.5,25 8.1,20.4 2.2,20.3	\
									12.2,10.3 6.3,10.2 6.3,3.2 4.8,1.5"
						)
					.attr("transform", "translate("+width*0.85+","+height*0.85+")")
					.attr("fill", "gray");		
	}

	function dragstarted(d){
		d.rotateEnable = true;
	}

	function dragged(d){
		d.x = d3.event.x;
		d.y = d3.event.y;
		d3.select(this).attr("transform", "translate("+d.x+","+d.y+")"+" "+"rotate("+d.rotateAngle+","+d.centroidX+","+d.centroidY+")");
		if (d.rotateEnable && d3.event.y < -50) {
			d.rotateEnable = false;
			rotateAction(d);
		}
		if (!d.rotateEnable && d3.event.y > -50) {
			d.rotateEnable = true;
		}
	}

	function dragended(d){
		d.rotateEnable = true;
		var textData = svg.select("#drag-counter").text().split(" ");
		var numValue = parseInt(textData[2]) + 1;
		svg.select("#drag-counter").text(textData[0]+" "+textData[1]+" "+numValue);
	}

	function rotateAction(d){
		d.rotateAngle = (d.rotateAngle + 45) % 360;
		d3.select("#"+d.id).attr("transform", "translate("+d.x+","+d.y+")"+" "+"rotate("+d.rotateAngle+","+d.centroidX+","+d.centroidY+")");
		//add rotation counter value
		var textData2 = svg.select("#rotation-counter").text().split(" ");	
		var numValue2 = parseInt(textData2[2]) + 1;
		svg.select("#rotation-counter").text(textData2[0]+" "+textData2[1]+" "+numValue2);		
	}
	function checkPattern(mode){
		var p12 = average(centroid(d3.select("#plate1")),centroid(d3.select("#plate2")));
		var p34 = average(centroid(d3.select("#plate3")),centroid(d3.select("#plate4")));
		var p5 = centroid(d3.select("#plate5"));
		var p6 = centroid(d3.select("#plate6"));
		var p7 = centroid(d3.select("#plate7"));
		var d1234 = distance(p12, p34);
		var d125 = distance(p12, p5);
		var d126 = distance(p12, p6);
		var d127 = distance(p12, p7);
		var d345 = distance(p34, p5);
		var d346 = distance(p34, p6);
		var d347 = distance(p34, p7);
		var d56 = distance(p5, p6);
		var d57 = distance(p5, p7);
		var d67 = distance(p6, p7);
		if (mode == "easy") {
			var m1234 = 256.658;
			var m125 = 81.904;
			var m126 = 127.022;
			var m127 = 100.347;
			var m345 = 338.562;
			var m346 = 129.636;
			var m347 = 204.259;
			var m56 = 208.926;
			var m57 = 166.427;
			var m67 = 96.269;
		} else {
			var m1234 = 53.9;
			var m125 = 185.1;
			var m126 = 70.7;
			var m127 = 152.4;
			var m345 = 165.5;
			var m346 = 91.4;
			var m347 = 115.7;
			var m56 = 250.6;
			var m57 = 258.9;
			var m67 = 125.2;
		}
		var c1234 = near(d1234, m1234);
		var c125 = near(d125, m125);
		var c126 = near(d126, m126);
		var c127 = near(d127, m127);
		var c345 = near(d345, m345);
		var c346 = near(d346, m346);
		var c347 = near(d347, m347);
		var c56 = near(d56, m56);
		var c57 = near(d57, m57);
		var c67 = near(d67, m67);
		return (c1234 && c125 && c126 && c127 && c345 && c346 && c347 && c56 && c57 && c67);
	}

	function centroid(g){
		var transform = g.attr("transform");
		var re = /translate\((.+),(.+)\)\srotate\((.+),(.+),(.+)\)/;
		var matched = transform.match(re);
		var px = parseFloat(matched[1]);
		var py = parseFloat(matched[2]);
		var dx = parseFloat(matched[4]);
		var dy = parseFloat(matched[5]);
		var x = px + dx;
		var y = py + dy;
		return {
			x: x,
			y: y
		}
	}

	function near(v1, v2) {
		return (v1 < v2 * 1.1 && v1 > v2 * 0.9);
	}

	function average(p1, p2){
		return {
			x: (p1.x + p2.x) / 2,
			y: (p1.y + p2.y) /2
		}
	}

	function distance(p1, p2){
		return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
	}
}
