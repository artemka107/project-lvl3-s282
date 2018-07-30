import $ from 'jquery';

export const createArticleBtn = (localId) => {
  const btn = document.createElement('button');
  btn.setAttribute('data-local-id', localId);
  btn.classList.add('btn', 'btn-primary');
  btn.innerHTML = 'Show description';
  return btn;
};

export const createArticleTitle = (link, title) => {
  const a = document.createElement('a');
  const p = document.createElement('p');
  a.setAttribute('herf', link);
  a.innerHTML = title;
  p.appendChild(a);
  return p;
};

export const createArticle = (link, title, localId) => {
  const articleWrapper = document.createElement('div');
  articleWrapper.classList.add('list-group-item', 'list-group-item-action', 'flex-column', 'align-items-start', 'd-flex', 'justify-content-between');
  const articleLink = createArticleTitle(link, title);
  const articleBtn = createArticleBtn(localId);
  articleWrapper.append(articleLink);
  articleWrapper.append(articleBtn);
  return articleWrapper;
};

export const createArticlesList = (articles) => {
  const articlesList = document.createElement('div');
  articlesList.classList.add('list-group');

  articles.forEach(({ article, localId }) => {
    const articleElement = createArticle(article.link, article.title, localId);
    articlesList.append(articleElement);
  });

  return articlesList;
};

export const renderArticlesList = (articles) => {
  const articlesContainer = document.createElement('div');
  const articlesList = createArticlesList(articles);
  articlesContainer.appendChild(articlesList);
  return articlesContainer;
};

export const renderChannels = (channels) => {
  const channelsContainer = document.querySelector('.rss-container');
  channels.forEach(({ articles }) => {
    const articlesList = renderArticlesList(articles);
    channelsContainer.appendChild(articlesList);
  });
  return channelsContainer;
};

export const renderModal = (description) => {
  const modal = document.querySelector('.modal-body');
  const p = document.createElement('p');
  p.innerHTML = description;
  modal.innerHTML = p.outerHTML;
};


export const showModal = () => {
  $('.modal').modal('show');
};

export const showInvalidMessage = (message) => {
  const searchInput = document.querySelector('.search-form-input');
  const invalidMessage = document.querySelector('.invalid-feedback');

  searchInput.classList.add('is-invalid');
  invalidMessage.innerHTML = message;
};

export const removeInvalidMessage = () => {
  const searchInput = document.querySelector('.search-form-input');
  const invalidMessage = document.querySelector('.invalid-feedback');

  searchInput.classList.remove('is-invalid');
  invalidMessage.innerHTML = '';
};

export const showProgressBar = () => {
  const progressBar = document.querySelector('.progress');
  progressBar.classList.add('d-flex');
};

export const hideProgressBar = () => {
  const progressBar = document.querySelector('.progress');
  progressBar.classList.remove('d-flex');
};
