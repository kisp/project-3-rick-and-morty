import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

const updatePagination = () => {
  pagination.innerHTML = `${page} / ${maxPage}`;
};

const gotoNextPage = () => {
  page++;
  fetchCharacters();
};

const gotoPrevPage = () => {
  page--;
  fetchCharacters();
};

const installPaginationEventHandlers = () => {
  nextButton.addEventListener("click", gotoNextPage);
  prevButton.addEventListener("click", gotoPrevPage);
};

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
      `https://rickandmortyapi.com/api/character?page=${page}`
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
