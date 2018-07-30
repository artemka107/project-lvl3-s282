import $ from 'jquery';
import { watch } from 'melanke-watchjs';
import initState from './state';
import {
  showInvalidMessage,
  removeInvalidMessage,
  showProgressBar,
  hideProgressBar,
  renderModal,
  showModal,
  renderChannels,
} from './dom';
import {
  onSubmitForm,
  setArticleLocalId,
} from './eventHandlers';

const state = initState();

export const getActiveArticle = (targetState) => {
  const { activeArticleId } = targetState.data;
  const activeArticle = targetState.data.rssChannels.reduce((acc, channel) => {
    const newAcc = channel.articles.find(article => article.localId === activeArticleId);
    return newAcc || acc;
  }, {});
  return activeArticle;
};

export const initEventHandlers = () => {
  const form = document.querySelector('.search-form');
  const modal = $('.modal');
  form.addEventListener('submit', event => onSubmitForm(event, state));
  modal.on('hidden.bs.modal', () => {
    state.changeState({ isActiveModal: false });
  });
};

export const watchState = () => {
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

  watch(state.data, 'isActiveModal', (prop, action, isActiveModal) => {
    if (isActiveModal) {
      const { article } = getActiveArticle(state);
      renderModal(article.description);
      showModal();
    }
  });

  watch(state.data, 'rssChannels', () => {
    renderChannels(state.data.rssChannels);
    const articleBtns = [...document.querySelectorAll('.rss-container .btn')];
    const hasArticles = articleBtns.length;
    if (hasArticles) {
      articleBtns.forEach((btn) => {
        btn.addEventListener('click', event => setArticleLocalId(event, state));
      });
    }
  });
};

export const init = () => {
  initEventHandlers();
  watchState();
};
