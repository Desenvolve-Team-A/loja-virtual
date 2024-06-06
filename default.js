let menu = document.getElementById("menu");
let sacola = document.getElementById("sacola");
let container = document.getElementById("container");
let footer = document.getElementById("footer");
let statusMenu = false;
let stautsSacola = false;

function toggleMenu(){
    statusMenu = !statusMenu;
     if((statusMenu)&&(stautsSacola)){
         sacola.style.left = "100%";
         stautsSacola = !stautsSacola;
         menu.style.left = "0";
         footer.style.filter = "contrast(50%) blur(2px)";
         container.style.filter = "contrast(50%) blur(2px)";
     }else if(statusMenu){
         menu.style.left = "0";
         footer.style.filter = "contrast(50%) blur(2px)";
         container.style.filter = "contrast(50%) blur(2px)";
     }else{
         menu.style.left = "-20%";
         footer.style.filter = "none";
         container.style.filter = "none";
     }
}

function toggleSacola(){
    stautsSacola = !stautsSacola;
     if((statusMenu)&&(stautsSacola)){
         menu.style.left = "-20%";
         statusMenu = !statusMenu;
         sacola.style.left = "70%";
         footer.style.filter = "contrast(50%) blur(2px)";
         container.style.filter = "ccontrast(50%) blur(2px)";
     }else if(stautsSacola){
         sacola.style.left = "70%";
         footer.style.filter = "contrast(50%) blur(2px)";
         container.style.filter = "contrast(50%) blur(2px)";
     }else{
         sacola.style.left = "100%";
         footer.style.filter = "none";
         container.style.filter = "none" ;
     }
}