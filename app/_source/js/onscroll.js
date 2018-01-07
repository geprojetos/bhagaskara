var pause = false;

(function(){

	window.onscroll = function(){

		// throttle
		if(pause) {
			return;
		}

		pause = true;

		setTimeout(function(){
			pause = false;
		}, 200);


		lazyload();
	    activeMenuFixed();
	    activeMenu();
	    console.log('scroll')
	};

})();