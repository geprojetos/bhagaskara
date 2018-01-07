(function(){

    openMenuMobile();    
})();

function openMenuMobile(){

    var tagHTML = document.documentElement;

    document.querySelector('.submenu__open').onclick = function() {
        tagHTML.classList.add('menu__active');
    };

    document.querySelector('.submenu__close').onclick = function() {
        tagHTML.classList.remove('menu__active');
    };

    tagHTML.onclick = function(event) {
        if (event.target === tagHTML) {
            tagHTML.classList.remove('menu__active');
        }
    };
}

function menuFixed() {

    var info    = document.querySelector(".info");
    var submenu = document.querySelector(".submenu__nav");

    if(info.getBoundingClientRect().top < - 50){

        submenu.classList.add("menu__fixed--top");
    }
    else {

        submenu.classList.remove("menu__fixed--top");
    }
}

function activeMenuFixed(){

    var windowWidth = window.innerWidth;
    var submenu = document.querySelector(".submenu__nav");

    if(windowWidth > 768) {
        
        menuFixed();
    }else{

        submenu.classList.remove("menu__fixed--top");   
    }
}
