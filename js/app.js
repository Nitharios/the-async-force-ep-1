// jshint esversion:6
console.log('Sanity Check: The Async Force Episode 1');

getCharacterNames('http://swapi.co/api/people/4/', 'person4Name', 'name');
getCharacterNames('http://swapi.co/api/people/4/', 'person4HomeWorld', 'homeworld');
getCharacterNames('http://swapi.co/api/people/14/', 'person14Name', 'name');
getCharacterNames('http://swapi.co/api/people/14/', 'person14Species', 'species');

let filmList = document.getElementById('filmList');
getMovieData('http://swapi.co/api/films/', 'filmList', 'title', 'planets');

// First function called that takes in the URL, id of DOM element to affect, and the trait the user wants returned
function getCharacterNames(url, id, trait) {
  // grabs all the elements with the same id
  let currentId = document.getElementById(id);
  // calls a new instance of XMLHttpRequest
  let oReq = new XMLHttpRequest();
  // adds an event listener that will invoke a function on page load
  oReq.addEventListener('load', reqListener(id, currentId, trait));
  // invokes the GET on the url passed in
  oReq.open("GET", url);
  // does something...
  oReq.send();
}

function reqListener(id, currentId, trait) {
  return function() { // this is the event handler
    let parsedDocument = JSON.parse(this.responseText);
    let urlRE = /^http/;
    // tests if the document returned contains an http link at a specific trait
    if (urlRE.test(parsedDocument[trait])) 
      // if true, will re-run character names --> recursion 
      return getCharacterNames(parsedDocument[trait], id, 'name');
    else currentId.innerHTML = parsedDocument[trait];
  };
}
// First function called that takes in a url, id of DOM element to affect, and the two traits the user wants to inspect 
function getMovieData(url, id, traitOne, traitTwo) {
  let currentId = document.getElementById(id);
  let oReq = new XMLHttpRequest();
  oReq.addEventListener('load', movieListListener(id, currentId, traitOne, traitTwo));
  oReq.open("GET", url);  
  oReq.send();
}
// Second function called that takes in id of DOM element to affect, the first trait to build, and the second trait to build under the first trait
function movieListListener(id, currentId, traitOne, traitTwo) {
  return function() { // this is the event handler
    let filmData = JSON.parse(this.responseText).results;
    let urlRE = /^http/;
    
    for (let i = 0; i < filmData.length; i++) {
      let filmBullet = document.createElement('li');
      filmBullet.className = traitOne;
      // fills in the HTML section of the ith iteration of traitOne
      filmBullet.innerHTML = filmData[i][traitOne];
      // appens new element to parent element
      filmList.appendChild(filmBullet);
      // if traitTwo is X
      if (traitTwo === 'planets') {
        let filmPlanets = document.createElement('ul');
        filmPlanets.className = 'filmPlanets';
        filmBullet.appendChild(filmPlanets);

        let traitTwoList = filmData[i][traitTwo];
        
        for (let j = 0; j < traitTwoList.length; j++) {
          getPlanets(traitTwoList[j], filmPlanets, 'name');
        }
      }
    }
  };
}
// gets the info for each planet url
function getPlanets(url, currentClass, trait) {
  let oReq = new XMLHttpRequest();
  oReq.addEventListener('load', getPlanetNames(currentClass, trait));
  oReq.open("GET", url);
  oReq.send(); 
}
// accesses the info for each planet url, specifically the names
function getPlanetNames(currentClass, trait) {
  return function() {
    let parsedDocument = JSON.parse(this.responseText);
    let planetBullet = document.createElement('li');
    planetBullet.className = 'planetName';
    planetBullet.innerHTML = parsedDocument[trait];
    currentClass.appendChild(planetBullet);
  };
}