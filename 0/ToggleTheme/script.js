"use strict";

let body = document.body;
let button = document.getElementById("toggleTheme");

button.onclick = () => {
  body.classList.toggle("dark");
};
