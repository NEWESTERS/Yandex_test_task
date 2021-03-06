window.onload = function ( ) {	
	//Progress object init
	progress = new Progress('progress');
	progress.setValue(75);
	// Set onchange method to value field, that changes value of progress object
	var percent = document.getElementById('percent');
	percent.onchange = function() {
		progress.setValue(this.value);
	};		
	// Set onclick method to animation switch, that switches animation mode
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
    // Set onclick method to animation switch, that switches hidden mode
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
// Turn switch
function switchOnclick (switcher) {
	if (switcher.getAttribute('enabled') == 'false') {
    		switcher.setAttribute('enabled', 'true')
    	} else {
    		switcher.setAttribute('enabled', 'false')
    	}
}


