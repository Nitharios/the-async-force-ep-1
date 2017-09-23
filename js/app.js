// jshint esversion:6
console.log('Sanity Check: The Async Force Episode 1');

getCharacterNames('http://swapi.co/api/people/4/', 'person4Name', 'name');
getCharacterNames('http://swapi.co/api/people/4/', 'person4HomeWorld', 'homeworld');
getCharacterNames('http://swapi.co/api/people/14/', 'person14Name', 'name');
getCharacterNames('http://swapi.co/api/people/14/', 'person14Species', 'species');

let filmList = document.getElementById('filmList');
getMovieData('http://swapi.co/api/films/', 'filmList', 'title', 'planets');

function getCharacterNames (url, id, trait) {
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
    if (urlRE.test(parsedDocument[trait])) 
      return getCharacterNames(parsedDocument[trait], id, 'name');
    else currentId.innerHTML = parsedDocument[trait];
  };
}

function getMovieData(url, id, traitOne, traitTwo) {
  let currentId = document.getElementById(id);
  let oReq = new XMLHttpRequest();
  oReq.addEventListener('load', movieListListener(id, currentId, traitOne, traitTwo));
  oReq.open("GET", url);  
  oReq.send();
}

function movieListListener (id, currentId, traitOne, traitTwo) {
  return function() { // this is the event handler
    let filmData = JSON.parse(this.responseText).results;
    let urlRE = /^http/;
    
    for (let i = 0; i < filmData.length; i++) {
      let filmBullet = document.createElement('li');
      filmBullet.className = traitOne;
      filmBullet.innerHTML = filmData[i][traitOne];
      filmList.appendChild(filmBullet);

      if (traitTwo === 'planets') {
        let filmPlanets = document.createElement('ul');
        filmPlanets.className = 'filmPlanets';
        filmBullet.appendChild(filmPlanets);

        let traitTwoList = filmData[i][traitTwo];
        
        for (let j = 0; j < filmData[i][traitTwo].length; j++) {
          getMovieNames(filmData[i][traitTwo][j], filmPlanets, 'name');
        }
      }
    }
  };
}

function getMovieNames (url, newClass, trait) {
  let currentClass = document.getElementsByClassName(newClass);
  let oReq = new XMLHttpRequest();
  oReq.addEventListener('load', planetNames(newClass, currentClass, trait));
  oReq.open("GET", url);
  oReq.send(); 
}

function planetNames (newClass, currentClass, trait) {
  return function() {
    let parsedDocument = JSON.parse(this.responseText);
    let planetBullet = document.createElement('li');
    planetBullet.className = 'planetName';
    planetBullet.innerHTML = parsedDocument[trait];
    newClass.appendChild(planetBullet);
  };
}