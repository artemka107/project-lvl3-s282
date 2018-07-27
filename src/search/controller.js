import { isURL, isEmpty } from 'validator';
import axios from 'axios';
import { changeState, getPropertyState } from './state';

const getRssChanel = (url) => {
  const proxyCors = 'https://cors-anywhere.herokuapp.com/';
  axios.get(`${proxyCors}${url}`)
    .then(({ data }) => {
      const parser = new DOMParser();
      const rss = parser.parseFromString(data, 'application/xml');
      const newChannel = {
        url,
        content: [...rss.getElementsByTagName('item')],
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

  const searchInput = document.querySelector('.search-form-input');
  const url = searchInput.value;
  const isValidForm = validateSearchForm(url);

  if (isValidForm) {
    getRssChanel(url);
  }
};


export default () => {
  const form = document.querySelector('.search-form');
  form.addEventListener('submit', onSubmitForm);
};
