// jshint esversion:6
console.log('Sanity Check: The Async Force Episode 1');

function getInstanceNames (url, id, trait) {
  let currentId = document.getElementById(id);
  let oReq = new XMLHttpRequest();
  oReq.addEventListener('load', reqListener(id, currentId, trait));
  oReq.open("GET", url);
  oReq.send();
}

function reqListener (id, currentId, trait) {
  return function() { // this is the event handler

    let parsedDocument = JSON.parse(this.responseText);
    let urlRE = /^http/;
    if (urlRE.test(parsedDocument[trait])) {
      return getInstanceNames(parsedDocument[trait], id, 'name');
    } else currentId.innerHTML = parsedDocument[trait];
  };
}

getInstanceNames('http://swapi.co/api/people/4/', 'person4Name', 'name');
getInstanceNames('http://swapi.co/api/people/4/', 'person4HomeWorld', 'homeworld');
getInstanceNames('http://swapi.co/api/people/14/', 'person14Name', 'name');
getInstanceNames('http://swapi.co/api/people/14/', 'person14Species', 'species');


function generateLists(url, id, traitOne, traitTwo) {
 let currentId = document.getElementById(id);
 let oReq = new XMLHttpRequest();
 oReq.addEventListener('load', reqListListener(id, currentId, traitOne, traitTwo));
 oReq.open("GET", url);  
 oReq.send();
}

function reqListListener (id, currentId, traitOne, traitTwo) {
  return function() { // this is the event handler
    let films = JSON.parse(this.responseText).results;
    let urlRE = /^http/;
    
    for (let i = 0; i < films.length; i++) {
      let filmBullet = document.createElement('li');
      filmBullet.innerHTML = films[i][traitOne];
      filmList.appendChild(filmBullet);
    }
  };
}

let filmList = document.getElementById('filmList');
generateLists('http://swapi.co/api/films/', 'filmList', 'title', 'planets');