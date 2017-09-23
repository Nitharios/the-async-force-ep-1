// jshint esversion:6
console.log('Sanity Check: The Async Force Episode 1');

function openTheSource (url, id, trait) {
  let currentId = document.getElementById(id);
  let oReq = new XMLHttpRequest();
  oReq.addEventListener('load', reqListener(id, currentId, trait));
  oReq.open("GET", url);
  oReq.send();
}

function reqListener (id, currentId, trait) {
  return function() { // this is the event handler

    let parsedDocument = JSON.parse(this.responseText);
    console.log(parsedDocument[trait]);
    let urlRE = /^http/;
    if (urlRE.test(parsedDocument[trait])) {
      return openTheSource(parsedDocument[trait], id, 'name');
    } else currentId.innerHTML = parsedDocument[trait];
  };
}

openTheSource('http://swapi.co/api/people/4/', 'person4Name', 'name');
openTheSource('http://swapi.co/api/people/4/', 'person4HomeWorld', 'homeworld');
openTheSource('http://swapi.co/api/people/14/', 'person14Name', 'name');
openTheSource('http://swapi.co/api/people/14/', 'person14Species', 'species');





// function reqOneListener() {
//   let personFourParsed = JSON.parse(this.responseText);
//   personFourName.innerHTML = personFourParsed.name;
// }

// function reqTwoListener(){
//   let personFourteenParsed = JSON.parse(this.responseText);
//   personFourteenName.innerHTML = personFourteenParsed.name;
// }

// oReqOne.addEventListener('load', reqOneListener);
// oReqOne.open("GET", "http://swapi.co/api/people/4/");
// oReqOne.send();

// oReqTwo.addEventListener('load', reqTwoListener);
// oReqTwo.open("GET", "http://swapi.co/api/people/14/");
// oReqTwo.send();
