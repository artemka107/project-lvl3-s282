import axios from 'axios';
import $ from 'jquery';
import { uniqueId } from 'lodash';
import { isURL, isEmpty } from 'validator';
import { changeState, getPropertyState } from './state';

const updateChannels = (newChannel) => {
  changeState({ listOfRssFeeds: [...getPropertyState('listOfRssFeeds'), newChannel] });
};

const getRssChanel = (url) => {
  const proxyCors = 'https://cors-anywhere.herokuapp.com/';
  axios.get(`${proxyCors}${url}`)
    .then(({ data }) => {
      const parser = new DOMParser();
      const rss = parser.parseFromString(data, 'application/xml');
      const updatedChannelItems = [...rss.getElementsByTagName('item')]
        .map(elem => ({ rssArticle: elem, localId: uniqueId() }));
      const newChannel = {
        url,
        content: updatedChannelItems,
      };
      updateChannels(newChannel);
    });
};

const messages = [
  {
    check: searchString => isEmpty(searchString),
    value: 'Plese fill the field',
  },
  {
    check: searchString => !isURL(searchString),
    value: 'Incorrect chanel URL',
  },
  {
    check: searchString => getPropertyState('listOfRssFeeds').find(({ url }) => url === searchString),
    value: 'This URL is already exists',
  },
];

const getErrorMessage = (searchString) => {
  const message = messages.find(({ check }) => check(searchString));
  return message && message.value;
};

const validateSearchForm = (searchString) => {
  const errorMessage = getErrorMessage(searchString);
  if (errorMessage) {
    changeState({ errorMessage, isValidForm: false });
    return false;
  }
  changeState({ errorMessage: '', isValidForm: true, isLoading: true });
  return true;
};

const onSubmitForm = (event) => {
  event.preventDefault();

  const searchInput = document.querySelector('.search-form-input');
  const url = searchInput.value;
  const isValidForm = validateSearchForm(url);

  if (isValidForm) {
    getRssChanel(url);
  }
};

const setActiveArticle = (event) => {
  event.preventDefault();
  event.stopPropagation();

  const { target } = event;

  if (target.classList.contains('btn')) {
    const localId = target.getAttribute('data-localId');
    changeState({ activeArticleId: localId, isActiveModal: true });
  }
};


export default () => {
  const form = document.querySelector('.search-form');
  const rssContainer = document.querySelector('.rss-container');
  rssContainer.addEventListener('click', setActiveArticle);
  form.addEventListener('submit', onSubmitForm);
  $('.modal').on('hidden.bs.modal', () => {
    changeState({ isActiveModal: false });
  });
};
