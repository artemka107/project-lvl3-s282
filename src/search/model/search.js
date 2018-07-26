import { forIn } from 'lodash';
import { watch } from 'melanke-watchjs';

const searchInput = document.querySelector('.search-form-input');
const invalidMessage = document.querySelector('.invalid-feedback');
const rssContainer = document.querySelector('.rss-container');


const state = {
  isValidForm: true,
  errorMessage: '',
  searchString: '',
  listOfRssFeeds: [],
};

export const changeState = (data) => {
  forIn(data, (value, key) => {
    state[key] = value;
  });
};

export const getPropertyState = key => state[key];

const createHtmlListItem = (elem) => {
  const li = document.createElement('li');
  const a = document.createElement('a');
  a.innerHTML = `${elem.description._cdata}`;
  a.setAttribute('href', elem.link._text);
  li.appendChild(a);
  return li;
};

watch(state, 'isValidForm', () => {
  if (state.isValidForm) {
    searchInput.classList.remove('is-invalid');
  } else {
    searchInput.classList.add('is-invalid');
  }
});

watch(state, 'errorMessage', () => {
  invalidMessage.innerHTML = state.errorMessage;
});

watch(state, 'listOfRssFeeds', () => {
  state.listOfRssFeeds.forEach((elem) => {
    const ul = document.createElement('ul');
    elem.content.forEach((article) => {
      const li = createHtmlListItem(article);
      ul.appendChild(li);
    });
    rssContainer.appendChild(ul);
  });
});


export default changeState;
