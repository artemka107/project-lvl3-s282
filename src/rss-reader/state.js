import { forIn } from 'lodash';

export default () => ({
  data: {
    isValidForm: true,
    errorMessage: '',
    searchString: '',
    rssChannels: [],
    isLoading: false,
    isActiveModal: false,
    activeArticleId: '',
  },

  changeState(newData) {
    forIn(newData, (value, key) => {
      this.data[key] = value;
    });
  },
  getPropertyState(key) {
    return this.data[key];
  },
});
