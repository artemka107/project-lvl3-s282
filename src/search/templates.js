export const getArticleTemplate = (title = '', link = '', localId = '') => `
  <div href="${link}" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex justify-content-between">
      <p class="mb-1">
        <a href="${link}">${title}</a>
      </p> 
      <button type="button" class="btn btn-primary" data-localId="${localId}">Show description</button>
    </div>
  </div>
`;

export const getModalTemplate = (description = '') => `
  <div class="modal-content">
    <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <p>${description}</p>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    </div>
  </div>
`;
