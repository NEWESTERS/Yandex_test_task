function draw( degree ) {
	  	var arc = describeArc(200, 200, 150, 0, degree);
	  	document.getElementById("progress").setAttribute("d", arc);
	}

function Progress ( link ) {
	var element = document.getElementById(link);

	this.setValue = function ( value ) {
		this.prev_value = this.value
		this.value = value;
		this.updateProgress();
	};

	this.setMod = function( property, value ){
		//element.setAttribute(property, value);

		switch(property) {
		 	case 'animated':
		 		if (value == 'yes') {
					element.style.webkitAnimationPlayState = 'running';
				} else {
					element.style.webkitAnimationPlayState = 'paused';
				}
		    	break;

		  	case 'hidden':
		  		if (value == 'yes') {
					element.setAttribute('display', 'none');
				} else {
					element.setAttribute('display', '');
				}
		    	break;
		}
	};

	this.updateProgress = function ( ) {
		var length = 2 * Math.PI * 50;
		var val = length * (this.value / 100);
		//animatedDraw(prev_val, val);
		element.setAttribute('stroke-dasharray', val + ' ' + length);
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
			progress.setMod('hidden', 'yes');
		} else {
		  	progress.setMod('hidden', '');
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


