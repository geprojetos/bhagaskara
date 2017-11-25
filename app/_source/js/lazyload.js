var pause = false;

window.onscroll = function(){

	// throttle
	if(pause) {
		return;
	}

	pause = true;

	setTimeout(function(){
		pause = false;
	}, 200);


	var imgs = document.querySelectorAll('img[data-src]:not([src])');
    
    for (var i = 0; i < imgs.length; i++) {
        if (imgs[i].getBoundingClientRect().top < window.innerHeight + 300) {
            imgs[i].src = imgs[i].getAttribute('data-src');
        }
    }

    sizeView();
};