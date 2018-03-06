function polarToCartesian( centerX, centerY, radius, angleInDegrees ) {
	var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

	return {
    	x: centerX + (radius * Math.cos(angleInRadians)),
    	y: centerY + (radius * Math.sin(angleInRadians))
  	};
}

function describeArc( x, y, radius, startAngle, endAngle ) {
	var start = polarToCartesian(x, y, radius, endAngle);
    var end = polarToCartesian(x, y, radius, startAngle);

    var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    var d = [
        "M", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");

    return d;       
}

function animatedDraw( val ) {
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
	  	var arc = describeArc(200, 200, 150, 0, timePassed / 5);
	  	document.getElementById("progress").setAttribute("d", arc);
	}
}

function Progress ( link ) {
	var element = document.getElementById(link);

	this.setValue = function ( value ) {
		this.value = value;
		this.updateProgress();
	};

	this.setMod = function( property, value ){
		element.setAttribute(property, value);
	};

	this.updateProgress = function ( ) {
		var val = 360 * (this.value / 100)
		animatedDraw(val);
	};

	this.hide = function ( is_hide ) {
		if(is_hide) {
			element.setAttribute('display', 'none')
		} else {
			element.setAttribute('display', '')
		}
	};
}

window.onload = function ( ) {		
	progress = new Progress('progress');
	progress.setValue(75);

	var percent = document.getElementById('percent');
	percent.onchange = function() {
		progress.setValue(this.value);
	};		

	var animate_switch = document.getElementById('animate-switch');	
	animate_switch.onclick = function() {
		switchOnclick(this);
		if(this.getAttribute('enabled') == 'true') {
			progress.setMod('animated','yes');
		}
		else {
		  	progress.setMod('animated','');
		}
    }; 

    var hide_switch = document.getElementById('hide-switch');	
	hide_switch.onclick = function() {
		switchOnclick(this)
		if(this.getAttribute('enabled') == 'true') {
			progress.hide(true);
		} else {
		  	progress.hide(false);
		}
    };
}

function switchOnclick (switcher) {
	if (switcher.getAttribute('enabled') == 'false') {
    		switcher.setAttribute('enabled', 'true')
    	} else {
    		switcher.setAttribute('enabled', 'false')
    	}
}


