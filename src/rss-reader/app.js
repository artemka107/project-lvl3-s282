import $ from 'jquery';
import { watch } from 'melanke-watchjs';
import initState from './state';
import { getUpdatedArticles } from './actions';
import {
  showInvalidMessage,
  removeInvalidMessage,
  showProgressBar,
  hideProgressBar,
  renderModal,
  showModal,
  renderArticles,
  showAlert,
  hideAlert,
  changeInputText,
  disableSearchBtn,
  unDisableSearchBtn,
} from './dom';
import {
  onSubmitForm,
  onChangeInput,
  hangEventsOnButtons,
} from './eventHandlers';

export const getActiveArticle = (targetState) => {
  const { activeArticleId } = targetState.data;
  const activeArticle = targetState.data.articles.find(article => article.localId === activeArticleId);
  return activeArticle;
};

export const initEventHandlers = (state) => {
  const form = document.querySelector('.search-form');
  const input = document.querySelector('.search-form-input');
  const modal = $('.modal');

  form.addEventListener('submit', event => onSubmitForm(event, state));
  input.addEventListener('change', event => onChangeInput(event, state));
  modal.on('hidden.bs.modal', () => {
    state.changeState({ isActiveModal: false });
  });
};

export const watchState = (state) => {
  watch(state.data, 'errorMessage', () => {
    if (!state.data.isValidForm) {
      showInvalidMessage(state.data.errorMessage);
    } else {
      removeInvalidMessage();
    }
  });

  watch(state.data, 'isLoading', (prop, action, isLoading) => {
    if (isLoading) {
      showProgressBar();
    } else {
      hideProgressBar();
    }
  });

  watch(state.data, 'alert', (prop, action, isVisibleAlert) => {
    if (isVisibleAlert) {
      showAlert();
    } else {
      hideAlert();
    }
  });

  watch(state.data, 'searchString', (prop, action, inputText) => {
    changeInputText(inputText);
  });


  watch(state.data, 'isActiveModal', (prop, action, isActiveModal) => {
    if (isActiveModal) {
      const article = getActiveArticle(state);
      renderModal(article.description);
      showModal();
    }
  });

  watch(state.data, 'updatedArticles', () => {
    renderArticles(state.data.updatedArticles);
    hangEventsOnButtons(state);
  });

  watch(state.data, 'isDisabledSearch', (prop, action, isDisabledSearch) => {
    if (isDisabledSearch) {
      disableSearchBtn();
    } else {
      unDisableSearchBtn();
    }
  });
};

export const init = () => {
  const state = initState();
  initEventHandlers(state);
  watchState(state);
};
