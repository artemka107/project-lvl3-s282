import { forIn } from 'lodash';

export default () => ({
  data: {
    isValidForm: true,
    hasChannels: false,
    errorMessage: '',
    searchString: '',
    articles: [],
    updatedArticles: [],
    channels: [],
    isLoading: false,
    isActiveModal: false,
    activeArticleId: '',
    alert: null,
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
