export function createCharacterCard() {
  const character = {
    id: 1,
    name: "Rick Sanchez",
    status: "Alive",
    species: "Human",
    type: "",
    gender: "Male",
    origin: {
      name: "Earth",
      url: "https://rickandmortyapi.com/api/location/1",
    },
    location: {
      name: "Earth",
      url: "https://rickandmortyapi.com/api/location/20",
    },
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    episode: [
      "https://rickandmortyapi.com/api/episode/1",
      "https://rickandmortyapi.com/api/episode/2",
      // ...
    ],
    url: "https://rickandmortyapi.com/api/character/1",
    created: "2017-11-04T18:48:46.250Z",
  };
  const html = `<div class="card__image-container">
      <img
        class="card__image"
        src="${character.image}"
        alt="${character.name}"
      />
      <div class="card__image-gradient"></div>
    </div>
    <div class="card__content">
      <h2 class="card__title">${character.name}</h2>
      <dl class="card__info">
        <dt class="card__info-title">Status</dt>
        <dd class="card__info-description">${character.status}</dd>
        <dt class="card__info-title">Type</dt>
        <dd class="card__info-description">${character.type}</dd>
        <dt class="card__info-title">Occurrences</dt>
        <dd class="card__info-description">${character.episode.length}</dd>
      </dl>
    </div>`;
  const elt = document.createElement("li");
  elt.classList.add("card");
  elt.innerHTML = html;
  return elt;
}
