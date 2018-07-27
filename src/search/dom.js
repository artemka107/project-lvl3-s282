import { watch } from 'melanke-watchjs';
import { state } from './state';
import { getListItem } from './templates';

export const getRssArticleInfo = (rssArticle) => {
  const linkText = rssArticle.getElementsByTagName('description')[0].textContent;
  const linkHref = rssArticle.getElementsByTagName('link')[0].textContent;
  return { linkText, linkHref };
};

export const createArticleItem = (rssArticle) => {
  const { linkText, linkHref } = getRssArticleInfo(rssArticle);
  const listItem = getListItem(linkText, linkHref);
  return listItem;
};

export const createArticlesList = (rssFeed) => {
  const articlesContainer = document.createElement('div');
  const articles = rssFeed.content.map((rssArticle) => {
    const article = createArticleItem(rssArticle);
    return article;
  });
  articlesContainer.classList.add('list-group');
  articlesContainer.innerHTML = articles.join('');
  return articlesContainer;
};

export const createHtmlListOfChannels = (targetState) => {
  const result = targetState.listOfRssFeeds.map((rssFeed) => {
    const articlesList = createArticlesList(rssFeed);
    return articlesList.outerHTML;
  });
  return result.join('');
};

export const renderFeedLists = (targetState) => {
  const rssContainer = document.querySelector('.rss-container');

  rssContainer.innerHTML = createHtmlListOfChannels(targetState);
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

  watch(state, 'errorMessage', () => {
    invalidMessage.innerHTML = state.errorMessage;
  });

  watch(state, 'listOfRssFeeds', () => {
    renderFeedLists(state);
  });
};
