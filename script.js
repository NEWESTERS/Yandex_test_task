function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
  var angleInRadians = (angleInDegrees-90) * Math.PI / 180.0;

  return {
    x: centerX + (radius * Math.cos(angleInRadians)),
    y: centerY + (radius * Math.sin(angleInRadians))
  };
}

function describeArc(x, y, radius, startAngle, endAngle){

    var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

function animatedDraw ( val ) {
	var start = Date.now(); // сохранить время начала

	var timer = setInterval(function() {
	  // вычислить сколько времени прошло с начала анимации
	  var timePassed = Date.now() - start;

	  if (timePassed > val * 5) {
	    clearInterval(timer); // конец через 2 секунды
	    return;
	  }

	  // рисует состояние анимации, соответствующее времени timePassed
	  draw(timePassed);

	}, 20);

	// в то время как timePassed идёт от 0 до 2000
	// left принимает значения от 0 до 400px
	function draw( timePassed ) {
	  document.getElementById('progress').style.width = timePassed / 5 + 'px';
	  var arc = describeArc(100, 100, 50, 0, timePassed / 5);
	  document.getElementById("arc1").setAttribute("d", arc);
	}
}

function Progress ( link ) {
	var element = document.getElementById(link);

	this.setValue = function ( value ) {
		this.value = value;
		this.updateProgress();
	};

	this.updateProgress = function ( ) {
		var val = 360 * (this.value / 100)
		//element.style.width = val + 'px';
		animatedDraw(val);
		//var arc = describeArc(100, 100, 100, 0, var);
		//document.getElementById("arc1").setAttribute("d", arc);
	};
}

window.onload = function () {		
	progress = new Progress('progress');
	progress.setValue(75);	
}

