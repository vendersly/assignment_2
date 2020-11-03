/* eslint-disable arrow-body-style */
/* eslint-disable no-console */



/* eslint-disable linebreak-style */
const restaurants = [];
fetch('/api', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
})
  .then((fromServer) => fromServer.json())
  .then((jsonFromServer) => restaurants.push(...jsonFromServer))
  .catch((err) => {
    console.log(err);
  });

function findMatches(wordToMatch, restaurants) {  
  if (wordToMatch.length === 0) {
    restaurants = [];
  } else {
    return restaurants.filter((place) => {
      const regex = new RegExp(wordToMatch, 'gi');
      return place.name.match(regex) || place.category.match(regex)
    || place.address_line_1.match(regex) || place.city.match(regex) || place.zip.match(regex);
    });}
  return restaurants;
}
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

function displayMatches() {
  const matchArr = findMatches(this.value, restaurants);
  const html = matchArr.map((place) => {
    return `
        <li>
            <span class= "name">${place.name}</span> <br>
            <span class= "category">${place.category}</span> <br>
            <i> <span class= "address">${place.address_line_1}</span> </i> <br>
            <i> <span class= "city">${place.city}</span> </i> <br>
            <span class= "zip">${place.zip}</span>  <br>
        </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
}

// const searchInput = document.querySelector('.search');
// const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);