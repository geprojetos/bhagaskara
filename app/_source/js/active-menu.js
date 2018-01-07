function activeMenu(){

	var aboutSession 	= document.querySelector("#about");
	var aboutItem 		= document.querySelector(".about");

	if(aboutSession.getBoundingClientRect().top < window.innerHeight -300){
		
		// about.classList.add("submenu__item__active");
		// aboutItem.classList.add("submenu__item__active")
	}
}