import { forIn } from 'lodash';

export const state = {
  isValidForm: true,
  errorMessage: '',
  searchString: '',
  listOfRssFeeds: [],
  isLoading: false,
  isActiveModal: false,
  activeArticleId: '',
};

export const changeState = (data) => {
  forIn(data, (value, key) => {
    state[key] = value;
  });
};

export const getPropertyState = key => state[key];
