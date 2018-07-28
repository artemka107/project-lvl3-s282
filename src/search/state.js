import { forIn } from 'lodash';

const initState = () => ({
  isValidForm: true,
  errorMessage: '',
  searchString: '',
  rssChannels: [],
  isLoading: false,
  isActiveModal: false,
  activeArticleId: '',
});

export const state = initState();

export const changeState = (data) => {
  forIn(data, (value, key) => {
    state[key] = value;
  });
};

export const getPropertyState = key => state[key];
