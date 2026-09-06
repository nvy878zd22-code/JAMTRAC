"use strict";
document.documentElement.classList.add("js");
const menu=document.querySelector(".menu");
const nav=document.querySelector("#nav");
if(menu&&nav){menu.hidden=false;menu.addEventListener("click",()=>{const open=menu.getAttribute("aria-expanded")!=="true";menu.setAttribute("aria-expanded",String(open));nav.classList.toggle("open",open);});document.addEventListener("keydown",event=>{if(event.key==="Escape"&&menu.getAttribute("aria-expanded")==="true"){menu.setAttribute("aria-expanded","false");nav.classList.remove("open");menu.focus();}});}
