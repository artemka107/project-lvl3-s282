import $ from 'jquery';
import { watch } from 'melanke-watchjs';
import initState from './state';
import { updateChannels } from './actions';
import {
  showInvalidMessage,
  removeInvalidMessage,
  showProgressBar,
  hideProgressBar,
  renderModal,
  showModal,
  renderChannels,
  showAlert,
  hideAlert,
  changeInputText,
} from './dom';
import {
  onSubmitForm,
  onChangeInput,
  hangEventsOnButtons,
} from './eventHandlers';

export const getActiveArticle = (targetState) => {
  const { activeArticleId } = targetState.data;
  const activeArticle = targetState.data.rssChannels.reduce((acc, channel) => {
    const newAcc = channel.articles.find(article => article.localId === activeArticleId);
    return newAcc || acc;
  }, {});
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
      const { article } = getActiveArticle(state);
      renderModal(article.description);
      showModal();
    }
  });

  watch(state.data, 'rssChannels', () => {
    renderChannels(state.data.rssChannels);
    hangEventsOnButtons(state);
    setInterval(updateChannels, 5000, state.data.rssChannels, state);
  });
};

export const init = () => {
  const state = initState();
  initEventHandlers(state);
  watchState(state);
};
