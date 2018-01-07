(function(){

	window.onresize = function(){

	    // throttle
	    if(pause) {
	        return;
	    }

	    pause = true;

	    setTimeout(function(){
	        pause = false;
	    }, 300);

	    activeMenuFixed();
	    console.log('resize')
	}
	
})();