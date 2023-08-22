import axios from 'axios';
axios.defaults.headers.common['x-api-key'] = 'live_0gxcHj0UybqbVBBC3FRmICm66IK3tW3XInIv8aPtDSEk0nklE2Wf1fpC3rU1P1fZ';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchBreeds, fetchCatByBreed } from './cat-api';

const refs = {
  select: document.querySelector('.breed-select'),
  catInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

refs.select.addEventListener('change', onSearchBreedCat);

refs.select.classList.add('is-hidden');
refs.loader.classList.add('loader');
refs.error.classList.add('is-hidden');

fetchBreeds()
  .then(data => {
    const dataMarkup = selectMarkUp(data);
    new SlimSelect({
      select: refs.select,
      data: dataMarkup,
    });
 refs.select.classList.remove('is-hidden')

  })
  .catch(error => {
    errorShow();
  })
  .finally(() => {
    refs. loader.classList.replace('loader', 'is-hidden');
    });
  

function errorShow() {
  refs.loader.classList.add('is-hidden');
 
 Notify.failure(
        'Oops! Something went wrong! Try choose another breed!'
      );
}

function selectMarkUp(arr) {
  const markUp = arr
    .map(
      ({ name, reference_image_id }) =>
        `<option value="${reference_image_id}">${name}</option>`
    )
    .join('');
  return refs.select.insertAdjacentHTML('beforeend', markUp);
}

function onSearchBreedCat() {
  refs.loader.classList.add('loader');
  refs.loader.classList.remove('is-hidden');
  refs.catInfo.classList.add('is-hidden');

  fetchCatByBreed(refs.select.value)
    .then(data => {
      createCardCat(data);
      setTimeout(() => {
        refs.catInfo.classList.remove('is-hidden');
      }, 200);
    })
    .catch(error => {
      errorShow();
    })
    .finally(() => {
      refs.loader.classList.add('is-hidden');
    });
}

function createCardCat({ url, breeds }) {
  const markUp = `<img  class="image" src="${url}" alt="${breeds[0].name} width="500" >
    <div class="wrapper">
    <h2 class="title">${breeds[0].name}</h2>
    <p class="description">${breeds[0].description}</p>
    <p class="temperament">${breeds[0].temperament}</p></div>`;
  return (refs.catInfo.innerHTML = markUp);
}

