/* ------------------------------ 
          IMPORTS
------------------------------ */

import { createCharacterCard } from "./components/card/card.js";

/* ------------------------------
          DOM ELEMENTS  
------------------------------ */

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

/* ------------------------------
          STATE VARIABLES         
------------------------------ */

let maxPage = 1;
let page = 1;
let searchQuery = "";

/* ------------------------------ 
          PAGINATION
------------------------------ */

const updatePagination = () => {
  pagination.innerHTML = `${page} / ${maxPage}`;
};

const gotoNextPage = () => {
  if (page === maxPage) return;
  page++;
  fetchCharacters();
};

const gotoPrevPage = () => {
  if (page === 1) return;
  page--;
  fetchCharacters();
};

const installPaginationEventHandlers = () => {
  nextButton.addEventListener("click", gotoNextPage);
  prevButton.addEventListener("click", gotoPrevPage);
};

/* ------------------------------ 
          SEARCH BAR
------------------------------ */
/*
Now we want even more functionality in our app. We want to find individual characters by typing
their name into the search bar.

- DONE Create a 'submit' event listener on the search bar.
- DONE Update the state variable `searchQuery` with the current text inside the search bar every time
  this event is triggered.
- DONE Modify the fetch URL again by adding another url encoded attribute `name`: append
  `&name=<searchQuery>` to the url. If the search query is an empty string, it will be ignored by
  the API, so don't worry about that.
- DONE Now trigger the function `fetchCharacters` whenever a submit event happens.

> 💡 You might run into some bugs at this point. Think about how the page and max page index might
> have to change when you start searching for only subsets of all characters.
*/

// search bar event listener
searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  // update state variable (Filer Characters)
  searchQuery = searchBar.querySelector("input").value;
  fetchCharacters();
});

/* ------------------------------ 
          FETCH DATA
------------------------------ */
// You can access the list of characters by using the /character endpoint.
// https://rickandmortyapi.com/api/character
/*
Now we can fetch the character data from the API and generate our cards with it.
- DONE Inside of the `index.js` create a function called `fetchCharacters`.
- DONE Use your knowledge about fetching to get the first 20 characters from the API. You can find the
  correct API endpoint in the docs.
- DONE Import the `createCharacterCard` function.
- DONE After successfully fetching the character data, use array methods to create an HTML card for each
  character and append it to the `cardContainer`.
- DONE Make sure that the `cardContainer` is emptied every time new characters are fetched (HINT: you can
  use `innerHTML = ''` for that).
- DONE Call the function inside the `index.js`. Now you should see 20 cards in your app.
*/

// funtion to fetch the characters
async function fetchCharacters() {
  try {
    // from the API
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${page}&name=${searchQuery}`
    );
    const data = await response.json();

    const info = data.info;
    maxPage = info.pages;

    updatePagination();

    // Clear Container
    cardContainer.innerHTML = "";

    // get the first 20 characters
    // return data.results.slice(0, 20);

    // create HTML card for characters
    data.results.forEach((character) => {
      const card = createCharacterCard(character);
      cardContainer.appendChild(card);
    });

    // error message
  } catch (err) {
    console.error("Rick is not home:", err);
  }
}

installPaginationEventHandlers();
fetchCharacters();
