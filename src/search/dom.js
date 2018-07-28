import { watch } from 'melanke-watchjs';
import $ from 'jquery';
import { state } from './state';
import { getArticleTemplate, getModalTemplate } from './templates';

export const getRssArticleInfo = (rssArticle) => {
  const tags = ['title', 'description', 'link'];
  return tags.reduce((acc, tagName) => {
    const value = rssArticle.getElementsByTagName(tagName)[0].textContent;
    return { ...acc, [tagName]: value };
  }, {});
};


export const createArticleItem = (rssArticle, localId) => {
  const { title, link } = getRssArticleInfo(rssArticle);
  return getArticleTemplate(title, link, localId);
};

export const createArticlesList = (rssFeed) => {
  const articlesContainer = document.createElement('div');
  const articles = rssFeed.content.map(({ rssArticle, localId }) => {
    const article = createArticleItem(rssArticle, localId);
    return article;
  });
  articlesContainer.classList.add('list-group');
  articlesContainer.innerHTML = articles.join('');
  return articlesContainer;
};

export const createFeedsHtml = (targetState) => {
  const result = targetState.listOfRssFeeds.map((rssFeed) => {
    const articlesList = createArticlesList(rssFeed);
    return articlesList.outerHTML;
  });
  return result.join('');
};

export const renderFeedLists = (targetState) => {
  const rssContainer = document.querySelector('.rss-container');

  rssContainer.innerHTML = createFeedsHtml(targetState);
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
  const activeArticle = targetState.listOfRssFeeds.reduce((acc, rssFeed) => {
    const newAcc = rssFeed.content.find(article => article.localId === activeArticleId);
    return newAcc || acc;
  }, {});
  return activeArticle;
};

export const renderModal = (targetState) => {
  const modal = document.querySelector('.modal-dialog');
  const { rssArticle } = getActiveArticle(targetState);
  const { description } = getRssArticleInfo(rssArticle);
  modal.innerHTML = getModalTemplate(description);
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

  watch(state, 'listOfRssFeeds', () => {
    renderFeedLists(state);
    hideProgressBar();
  });
};
