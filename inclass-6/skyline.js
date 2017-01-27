'use strict'

var bldPositions = []

var sunPosition = {
	x1: 20,
	y1: 70,
	x2: 40,
	y2: 90
}

var carPosition = {
	x1: 0,
	y1: 360,
	x2: 60,
	y2: 400
}

var createApp = function(canvas) { 
	var c = canvas.getContext("2d");

	// Create the ground
	var floor = canvas.height/2
	var grad = c.createLinearGradient(0,floor,0,canvas.height)
	grad.addColorStop(0, "green")
	grad.addColorStop(1, "black")
	c.fillStyle=grad
	c.fillRect(0, floor, canvas.width, canvas.height)

	// common size for windows
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3

	// colors of buildings
	var blgColors = [ 'red', 'blue', 'gray', 'orange'] 

	//build a building
	var build = function() { 
		var x0 = Math.random()*canvas.width
		var blgWidth = (windowWidth+windowSpacing) * Math.floor(Math.random()*10)
		var blgHeight = Math.random()*canvas.height/2

		c.fillStyle = blgColors[ Math.floor(Math.random()*blgColors.length)]
		var buildingColor = c.fillStyle
		c.fillRect(x0, floor - blgHeight, blgWidth, blgHeight)

		drawWindows(canvas, x0, blgWidth, blgHeight)

		return {
			x1: x0,
			y1: floor - blgHeight,
			x2: x0 + blgWidth,
			y2: floor,
			blgColor: buildingColor
		}
	}

	return {
		build: build
	}
}

var drawWindows = function(canvas, x0, blgWidth, blgHeight) {
	var c = canvas.getContext("2d");
	var floor = canvas.height/2
	var windowSpacing = 2, floorSpacing = 3
	var windowHeight = 5, windowWidth = 3	
	for (var y = floor - floorSpacing; y > floor - blgHeight; y -= floorSpacing + windowHeight) {
		for (var x = windowSpacing; x < blgWidth - windowWidth; x += windowSpacing + windowWidth) {
			if (Math.random() < 0.5) {
				c.fillStyle="yellow"
			} else {
				c.fillStyle="black"
			}
			c.fillRect(x0 + x, y - windowHeight, windowWidth, windowHeight)
		}
	}
}

var redrawBuilding = function(bldPosition) {
	var canvas = document.querySelector("canvas")
	var c = canvas.getContext("2d")
	c.fillStyle = bldPosition.blgColor
	var x1 = bldPosition.x1
	var x2 = bldPosition.x2
	var y1 = bldPosition.y1
	var y2 = bldPosition.y2
	c.fillRect(x1, y1, x2 - x1, y2 - y1)
	var x0 = x1
	var blgWidth = x2 - x1
	var blgHeight = y2 - y1
	drawWindows(canvas, x0, blgWidth, blgHeight)
}

var isIntersect = function(r1, r2) {
	//though the sun or the car is not rectangular, 
	//we consider it as rectangualr for convenience
	return !(r2.x1 > r1.x2 || 
			r2.x2 < r1.x1 || 
			r2.y1 > r1.y2 ||
			r2.y2 < r1.y1);
}

var paintSun = function(c, color, sunPosition) {
	if (color == "#FF6666") {
		c.fillStyle = color
		c.beginPath()
		c.arc((sunPosition.x1 + sunPosition.x2) / 2, 
			(sunPosition.y1 + sunPosition.y2) /2, 
			(sunPosition.x2 - sunPosition.x1) / 2, 
			0, 
			Math.PI*2)
		c.closePath()
		c.fill()
	} else {
		c.fillStyle = color
		c.fillRect(sunPosition.x1 ,sunPosition.y1, 
			sunPosition.x2 - sunPosition.x1, sunPosition.y2 - sunPosition.y1)
	}
}

var paintCar = function(c, color, carPosition) {
	c.fillStyle = color
	c.fillRect(carPosition.x1 ,carPosition.y1, 
			carPosition.x2 - carPosition.x1, carPosition.y2 - carPosition.y1)
}

window.onload = function() {
	var app = createApp(document.querySelector("canvas"))
	document.getElementById("build").onclick = function() {
		var fourAxis = app.build()
		bldPositions.push(fourAxis)
		console.log(bldPositions)
	}

	//listener when the building is clicked
	document.getElementsByTagName("canvas")[0].addEventListener("click", function(e) {
		console.log(e);
		var hitX = e.offsetX
		var hitY = e.offsetY
		var isHitBld = false
		bldPositions.forEach(function(element) {
			var x1 = element.x1
			var x2 = element.x2
			var y1 = element.y1
			var y2 = element.y2
			if (hitX >= x1 && hitX < x2 && hitY >= y1 && hitY < y2) {
				isHitBld = true
				element.y1 = element.y1 - 10.0
				redrawBuilding(element)
			}
		})
		console.log(isHitBld)
	});

	//routingly redraw to make windows shine
	var buildingsInterval = setInterval(function() {
		bldPositions.forEach(function(element) {
			redrawBuilding(element)
			if (isIntersect(element, carPosition)) {
				var canvas = document.querySelector("canvas")
				var c = canvas.getContext("2d")				
				paintCar(c, "#111111", carPosition)
			}
		})
	}, 100)

	//routingly erase the sun and move the position and redraw the sun
	var sunInterval = setInterval(function() {
		var canvas = document.querySelector("canvas")
		var c = canvas.getContext("2d")
		//erase previous sun
		paintSun(c, "#FFFFFF", sunPosition)
		bldPositions.forEach(function(element) {
			if (isIntersect(element, sunPosition)) {
				redrawBuilding(element)
			}
		})
		//draw new sun
		sunPosition.x1 = sunPosition.x1 + 2
		sunPosition.x2 = sunPosition.x2 + 2
		if (sunPosition.x1 > canvas.width) {
			sunPosition.x1 = 20
			sunPosition.x2 = 40

		}
		paintSun(c, "#FF6666", sunPosition)
		bldPositions.forEach(function(element) {
			if (isIntersect(element, sunPosition)) {
				redrawBuilding(element)
			}
		})

	}, 200)

	var carInterval = setInterval(function() {
		var canvas = document.querySelector("canvas")
		var c = canvas.getContext("2d")
		//erase previous car
		paintCar(c, "#FFFFFF", carPosition)
		bldPositions.forEach(function(element) {
			if (isIntersect(element, carPosition)) {
				redrawBuilding(element)
			}
		})
		//draw new car
		carPosition.x1 = carPosition.x1 + 2
		carPosition.x2 = carPosition.x2 + 2
		if (carPosition.x1 > canvas.width) {
			carPosition.x1 = 0
			carPosition.x2 = 60
		}
		paintCar(c, "#111111", carPosition)
	}, 200)



}


