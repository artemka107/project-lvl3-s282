import { watch } from 'melanke-watchjs';
import $ from 'jquery';
import { state } from './state';
import { getArticleTemplate, getModalTemplate } from './templates';

export const createArticlesList = (rssChannel) => {
  const articlesContainer = document.createElement('div');
  const articles = rssChannel.articles.map(({ article, localId }) => {
    const articleHtml = getArticleTemplate(article.title, article.link, localId);
    return articleHtml;
  });
  articlesContainer.classList.add('list-group');
  articlesContainer.innerHTML = articles.join('');
  return articlesContainer;
};

export const createChannelsHtml = (targetState) => {
  const channelsList = targetState.rssChannels.map((channel) => {
    const articlesList = createArticlesList(channel);
    return articlesList.outerHTML;
  });
  const channelsHtml = channelsList.join('');
  return channelsHtml;
};

export const renderRssChannels = (targetState) => {
  const rssContainer = document.querySelector('.rss-container');

  rssContainer.innerHTML = createChannelsHtml(targetState);
};

export const showProgressBar = () => {
  const progressBar = document.querySelector('.progress');
  progressBar.classList.remove('d-none');
};

export const hideProgressBar = () => {
  const progressBar = document.querySelector('.progress');
  progressBar.classList.add('d-none');
};

export const getActiveArticle = (targetState) => {
  const { activeArticleId } = targetState;
  const activeArticle = targetState.rssChannels.reduce((acc, channel) => {
    const newAcc = channel.articles.find(article => article.localId === activeArticleId);
    return newAcc || acc;
  }, {});
  return activeArticle;
};

export const renderModal = (targetState) => {
  const modal = document.querySelector('.modal-dialog');
  const { article } = getActiveArticle(targetState);
  modal.innerHTML = getModalTemplate(article.description);
};

export const initListenToState = () => {
  const searchInput = document.querySelector('.search-form-input');
  const invalidMessage = document.querySelector('.invalid-feedback');

  watch(state, 'isValidForm', () => {
    if (state.isValidForm) {
      searchInput.classList.remove('is-invalid');
    } else {
      searchInput.classList.add('is-invalid');
    }
  });

  watch(state, 'isLoading', () => {
    showProgressBar();
  });

  watch(state, 'errorMessage', () => {
    invalidMessage.innerHTML = state.errorMessage;
  });

  watch(state, 'isActiveModal', (prop, action, isActiveModal) => {
    if (isActiveModal) {
      renderModal(state);
      $('.modal').modal('show');
    }
  });

  watch(state, 'rssChannels', () => {
    renderRssChannels(state);
    hideProgressBar();
  });
};
