import validateSearchForm from './validation';
import { getUpdatedArticles } from './actions';

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
  const errorMessage = validateSearchForm(url, state.data.channels);

  if (errorMessage) {
    state.changeState({
      isValidForm: false,
      errorMessage,
    });
  } else {
    state.changeState({
      isLoading: true,
      alert: null,
      isDisabledSearch: true,
    });
    state.changeState({ channels: [...state.data.channels, url] });
    getUpdatedArticles(state)
      .then(() => {
        state.changeState({
          alert: false,
        });
      })
      .catch(() => {
        state.changeState({
          alert: 'fail',
          channels: state.data.channels.filter(channel => channel !== url),
        });
      })
      .finally(() => {
        state.changeState({
          searchString: '',
          errorMessage: '',
          isValidForm: true,
          isDisabledSearch: false,
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
