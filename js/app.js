// jshint esversion:6
console.log('Sanity Check: The Async Force');

let personReq = new XMLHttpRequest();

function reqListener() {
  console.log(this.statusText);
}

personReq.addEventListener("load", personReq);

personReq.open("GET", "http://swapi.co/api/people/4/");
personReq.send();