import validateSearchForm from './validation';
import { getRssChannel } from './actions';

export const setArticleLocalId = (event, state) => {
  event.preventDefault();
  event.stopPropagation();

  const { target } = event;

  const localId = target.getAttribute('data-local-id');
  state.changeState({ activeArticleId: localId, isActiveModal: true });
};

export const onSubmitForm = (event, state) => {
  event.preventDefault();

  const searchInput = document.querySelector('.search-form-input');
  const url = searchInput.value;
  const errorMessage = validateSearchForm(url, state.data.rssChannels);

  if (errorMessage) {
    state.changeState({ isValidForm: false, errorMessage });
  } else {
    state.changeState({ isLoading: true, alert: null });
    getRssChannel(url)
      .then((newChannel) => {
        state.changeState({
          rssChannels: [...state.data.rssChannels, newChannel],
          isValidForm: true,
          errorMessage: '',
          isLoading: false,
          alert: false,
          searchString: '',
        });
      })
      .catch(() => {
        state.changeState({
          alert: 'fail',
          isValidForm: true,
          errorMessage: '',
          isLoading: false,
        });
      });
  }
};

export const onChangeInput = (event, state) => {
  const searchString = event.target.value;
  state.changeState({ searchString });
};

export const hangEventsOnButtons = (state) => {
  const articleBtns = [...document.querySelectorAll('.rss-container .btn')];
  const hasArticles = articleBtns.length;
  if (hasArticles) {
    articleBtns.forEach((btn) => {
      btn.addEventListener('click', event => setArticleLocalId(event, state));
    });
  }
};
