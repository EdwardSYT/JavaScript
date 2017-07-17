function showFly(domId,width,height,datas,clickCallback) {
	var canvas = document.getElementById(domId);
	var circles = [];
	canvas.width = width;
	canvas.height = height;
	var animate_self;

	var context = canvas.getContext("2d");
	for (var i = 0; i < datas.length+10; i++) {
		addRandomCircle(datas[i]);
	};

	function addRandomCircle(data) {
		var speedX = Math.random() * 2;
		var speedY = Math.random() * 2;
		if (speedX < 0.6) {
			speedX += 1
		} else if (speedY < 0.6) {
			speedY += 1
		}
		var obj = {
				"color": getRandomColor(),
				"x": randomFromTo(0, canvas.width),
				"y": randomFromTo(0, canvas.height),
				"speedX": speedX,
				"speedY": speedY,
				"val": data ? data : "",
				"textColor": "black",
				"font": 15,
				"alpha1": 0, //0.4
				"alpha2": 0, //0.15
				"alpha3": 0 //0.4
			}
			// 保存到数组.
		circles.push(obj);
	}

	for (var j = 0; j < circles.length; j++) {
		draw(context, circles[j]);
	};

	function draw(cxt, ball) {
		cxt.beginPath();
		cxt.fillStyle = ball.color;
		cxt.globalAlpha = 0;
		cxt.globalAlpha = ball.alpha1; //0.4
		cxt.arc(ball.x, ball.y, 8, 0, 2 * Math.PI);
		cxt.fill();
		cxt.closePath();

		cxt.beginPath();
		cxt.fillStyle = ball.color;
		cxt.globalAlpha = 0;
		cxt.globalAlpha = ball.alpha2; //0.15
		cxt.arc(ball.x, ball.y, 12, 0, 2 * Math.PI);
		cxt.fill();
		cxt.closePath();

		cxt.beginPath();
		//设置字体样式
		cxt.font = ball.font + "px Courier New";
		cxt.globalAlpha = 0;
		cxt.globalAlpha = ball.alpha3; //0.4
		//设置字体颜色
		cxt.fillStyle = ball.textColor;
		//从坐标点(50,50)开始绘制文字
		cxt.fillText(ball.val, ball.x + 15, ball.y + 6);
		cxt.closePath();

		update(ball);
	}

	clearInterval(animate_self);
	animate_self = setInterval(function() {
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		for (var j = 0; j < circles.length; j++) {
			draw(context, circles[j]);
		};
	}, 40);

	function update(ball) {
		var w = canvas.width;
		var h = canvas.height;
		// 左上
		if (ball.x < w / 2 && ball.y < h / 2) {
			ball.x -= ball.speedX;
			ball.y -= ball.speedY;
			if (ball.y < h / 5 || ball.x < w / 5) {
				ball.alpha1 -= 0.005;
				ball.alpha2 -= 0.001;
				ball.alpha3 -= 0.005;
			} else if (ball.y >= h / 5 || ball.x >= w / 5) {
				if (ball.alpha1 < 0.4) ball.alpha1 += 0.005;
				if (ball.alpha2 < 0.15) ball.alpha2 += 0.001;
				if (ball.alpha3 < 0.4) ball.alpha3 += 0.005;
			}
		}
		// 右上
		if (ball.x < w && ball.x >= w / 2 && ball.y <= h / 2) {
			ball.x += ball.speedX;
			ball.y -= ball.speedY;
			if (ball.y < h / 5 || ball.x > (w / 5) * 4) {
				ball.alpha1 -= 0.005;
				ball.alpha2 -= 0.001;
				ball.alpha3 -= 0.005;
			} else if (ball.y >= h / 5 && ball.x <= (w / 5) * 4) {
				if (ball.alpha1 < 0.4) ball.alpha1 += 0.005;
				if (ball.alpha2 < 0.15) ball.alpha2 += 0.001;
				if (ball.alpha3 < 0.4) ball.alpha3 += 0.005;
			}
		}
		// 左下
		if (ball.x <= w / 2 && ball.y >= h / 2) {
			ball.x -= ball.speedX;
			ball.y += ball.speedY;
			if (ball.x < w / 5 || ball.y > (h / 5) * 4) {
				ball.alpha1 -= 0.005;
				ball.alpha2 -= 0.001;
				ball.alpha3 -= 0.005;
			} else if (ball.x >= w / 5 || ball.y <= (h / 5) * 4) {
				if (ball.alpha1 < 0.4) ball.alpha1 += 0.005;
				if (ball.alpha2 < 0.15) ball.alpha2 += 0.001;
				if (ball.alpha3 < 0.4) ball.alpha3 += 0.005;
			}
		}
		// 右下
		if (ball.x > w / 2 && ball.x < w && ball.y > h / 2 && ball.y < h) {
			ball.x += ball.speedX;
			ball.y += ball.speedY;
			if (ball.x > (w / 5) * 4 || ball.y > (h / 5) * 4) {
				ball.alpha1 -= 0.005;
				ball.alpha2 -= 0.001;
				ball.alpha3 -= 0.005;
			} else if (ball.x <= (w / 5) * 4 || ball.y <= (h / 5) * 4) {
				if (ball.alpha1 < 0.4) ball.alpha1 += 0.005;
				if (ball.alpha2 < 0.15) ball.alpha2 += 0.001;
				if (ball.alpha3 < 0.4) ball.alpha3 += 0.005;
			}
		}

		var speedX = Math.random() * 2;
		var speedY = Math.random() * 2;
		if (speedX < 0.6) {
			speedX += 1
		} else if (speedY < 0.6) {
			speedY += 1
		}

		if (ball.x <= 0 || ball.y <= 0 || ball.x >= w || ball.y >= h) {
			ball.x = randomFromTo(canvas.width / 2 - canvas.width / 3, canvas.width / 2 + canvas.width / 3);
			ball.y = randomFromTo(canvas.height / 2 - canvas.width / 3, canvas.height / 2 + canvas.width / 3);
			ball.speedX = speedX;
			ball.speedY = speedY;
			ball.alpha1 = 0;
			ball.alpha2 = 0;
			ball.alpha3 = 0;
		}

	}

	canvas.addEventListener("mousemove", function(ev) {

		var ev = ev || event;
		var l = ev.clientX - canvas.offsetLeft;
		var t = ev.clientY - canvas.offsetTop;
		for (var j = 0; j < circles.length; j++) {
			context.beginPath();
			context.rect(circles[j].x + 15, circles[j].y - 6, 100, 20);
			if (context.isPointInPath(l, t)) {
				circles[j].textColor = circles[j].color;
				circles[j].font = 20;
				if(circles[j].val) canvas.style.cursor = "pointer";
				break;
			} else {
				circles[j].textColor = "black";
				circles[j].font = 15;
				canvas.style.cursor = "default";
			}
			context.closePath();

		};
	})

	canvas.addEventListener("click", function(ev) {
		var ev = ev || event;
		var l = ev.clientX - canvas.offsetLeft;
		var t = ev.clientY - canvas.offsetTop;
		for (var j = 0; j < circles.length; j++) {
			context.beginPath();
			context.rect(circles[j].x + 15, circles[j].y - 6, 100, 20);
			if (context.isPointInPath(l, t)) {
				if(circles[j].val) clickCallback(circles[j].val);
			}
			context.closePath();
		};
	})

	function randomFromTo(from, to) {
		return Math.floor(Math.random() * (to - from + 1) + from);
	}

	function getRandomColor() {
		return (function(m, s, c) {
			return (c ? arguments.callee(m, s, c - 1) : '#') + s[m.floor(m.random() * 16)];
		})(Math, '0123456789abcdef', 5);
	}
}