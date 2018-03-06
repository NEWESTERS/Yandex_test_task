/**
 * @author Balikhin Nikita <ramiro.cruz@mail.ru>
 */

/**
 * Represents a progress bar.
 * @constructor
 * @param {string} id - Id of element representing progress bar path.
 * @property {object} element - Element itself representing progress bar path.
 */
function Progress ( id ) {
	/** @lends Progress */
	/** @access private
	 */
	var element = document.getElementById(id);

	/**
     * Set progress bar percent value
     * @access public
     * @param {string} value - Percent value to set as progress.
     */
	this.setValue = function ( value ) {
		this.prev_value = this.value
		this.value = value;
		this.updateProgress();
	};

	/**
     * Set mode to progress bar
     * @access public
     * @param {string} mod - Mod to be switched.
     * @param {string} value - Mode setting value ('yes' to turn mode on, anything else to turn mode off).
     */
	this.setMod = function( mod, value ){
		switch(mod) {
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

	/**
     * Updates progress bar on view
     * @access public
     */
	this.updateProgress = function ( ) {
		var length = 2 * Math.PI * 50;
		var val = length * (this.value / 100);
		element.setAttribute('stroke-dasharray', val + ' ' + length);
	};
}