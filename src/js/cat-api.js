
const BASE_URL = 'https://api.thecatapi.com/v1';
const END_POINT_1 = '/breeds';
const END_POINT_2 = '/images';

function fetchBreeds() {
    const url_1 = `${BASE_URL}${END_POINT_1}`;
    return fetch(url_1).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}


function fetchCatByBreed(breedId) {
    const url_2 = `${BASE_URL}${END_POINT_2}/${breedId}`;
  return fetch(url_2).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

export { fetchBreeds, fetchCatByBreed };