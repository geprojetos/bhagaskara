function activeMenu(){

	var aboutSession 	= document.querySelector("#about");
	var aboutItem 		= document.querySelector(".about");

	if(aboutSession.getBoundingClientRect().top < window.innerHeight -300){
		
		aboutItem.classList.remove("active");
		aboutItem.classList.add("active");
	};
}