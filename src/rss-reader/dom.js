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
  a.setAttribute('href', link);
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

export const createArticlesList = (articles, url) => {
  const articlesList = document.createElement('div');
  articlesList.classList.add('list-group');
  articlesList.setAttribute('data-channel-url', url);

  articles.forEach(({ link, title, localId }) => {
    const articleElement = createArticle(link, title, localId);
    articlesList.append(articleElement);
  });

  return articlesList;
};

export const renderChannels = (channels) => {
  const channelsContainer = document.querySelector('.rss-container');
  channelsContainer.innerHTML = '';
  channels.forEach(({ articles, url }) => {
    const articlesList = createArticlesList(articles, url);
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

export const renderAlert = () => {
  const alertContainer = document.querySelector('.alert-container');
  const alert = `
    <div class="alert alert-danger alert-dismissible fade show" role="alert">
      <strong>Error!</strong> Something went wrong
      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div> `;
  alertContainer.innerHTML = alert;
};

export const changeInputText = (text) => {
  const searchInput = document.querySelector('.search-form-input');
  searchInput.value = text;
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

export const showAlert = () => {
  renderAlert();
};

export const hideAlert = () => {
  const alertElement = $('.alert-danger');
  alertElement.alert('close');
};
