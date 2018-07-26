import { watch } from 'melanke-watchjs';
import { state } from './model';

export const getRssArticleInfo = (article) => {
  const linkText = article.getElementsByTagName('description')[0].textContent;
  const linkHref = article.getElementsByTagName('link')[0].textContent;
  return { linkText, linkHref };
};

export const createHtmlLinkToArticle = (article) => {
  const a = document.createElement('a');
  const { linkText, linkHref } = getRssArticleInfo(article);
  a.innerHTML = linkText;
  a.setAttribute('href', linkHref);
  return a;
};

export const createArticlesList = (rssFeed) => {
  const ul = document.createElement('ul');
  rssFeed.content.forEach((article) => {
    const a = createHtmlLinkToArticle(article);
    const li = document.createElement('li');
    li.appendChild(a);
    ul.appendChild(li);
  });
  return ul;
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
