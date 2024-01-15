"use strict";

let result = document.getElementById("result");

function toggleSelected(e) {
    e.target.classList.toggle("selected");
}

function copyText(e) {
    if(e.ctrlKey) {
        result.innerText = e.target.innerText;
    }
}

document.querySelectorAll("#container > div").forEach(div => {
    div.addEventListener("mouseenter", toggleSelected);
    div.addEventListener("mouseleave", toggleSelected);
    div.addEventListener("click", copyText);
});
