import { isURL, isEmpty } from 'validator';
import axios from 'axios';
import convertToJson from 'xml-js';
import { changeState, getPropertyState } from '../model/search';

const form = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-form-input');

const getRssChanel = (url) => {
  const proxyCors = 'https://cors-anywhere.herokuapp.com/';
  axios.get(`${proxyCors}${url}`)
    .then(({ data }) => {
      const { rss } = convertToJson.xml2js(data, { compact: true });
      const newChannel = {
        url,
        content: rss.channel.item,
      };
      changeState({ listOfRssFeeds: [...getPropertyState('listOfRssFeeds'), newChannel] });
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
  changeState({ errorMessage: '', isValidForm: true });
  return true;
};

const onSubmitForm = (event) => {
  event.preventDefault();
  const url = searchInput.value;
  const isValidForm = validateSearchForm(url);
  if (isValidForm) {
    getRssChanel(url);
  }
};


form.addEventListener('submit', onSubmitForm);