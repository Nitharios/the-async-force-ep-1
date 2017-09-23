// jshint esversion:6
console.log('Sanity Check: The Async Force Episode 1');

let personFour = document.getElementById("person4Name");

let oReq = new XMLHttpRequest();
oReq.addEventListener('load', reqListener);
oReq.open("GET", "http://swapi.co/api/people/4/");
oReq.send();

function reqListener() {
  var personFourParsed = JSON.parse(this.responseText);
  console.log(this.responseText);
  personFour.innerHTML = personFourParsed.name;
}


