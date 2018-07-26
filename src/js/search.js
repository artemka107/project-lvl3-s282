import { isURL, isEmpty } from 'validator';
import StateMachine from 'javascript-state-machine';
import axios from 'axios';
import convertToJson from 'xml-js';

const form = document.querySelector('.search-form');
const searchInput = document.querySelector('.search-form-input');
const overlay = document.querySelector('.overlay');

const state = {
  isValidForm: true,
  searchString: '',
};

const fsm = new StateMachine({
  init: 'init',
  transitions: [
    { name: 'showError', from: '*', to: 'error' },
    { name: 'hideError', from: '*', to: 'success' },
    { name: 'resetToDefault', from: '*', to: 'init' },
    { name: 'search', from: '*', to: 'searching' },
  ],
  methods: {
    onShowError() {
      searchInput.classList.add('is-invalid');
      state.isValidForm = false;
    },
    async onSearch() {
      overlay.classList.add('show');
      const { data } = await axios.get(`https://cors-anywhere.herokuapp.com/${state.searchString}`);
      const result = convertToJson.xml2js(data, { compact: true });
      console.log(result);
    },
    onHideError() {
      searchInput.classList.remove('is-invalid');
      searchInput.classList.add('is-valid');
      state.isValidForm = true;
    },
    onResetToDefault() {
      overlay.classList.remove('show');
      searchInput.classList.remove('is-invalid');
      searchInput.classList.remove('is-valid');
      searchInput.value = '';
    },
  },
});

const validateInput = () => {
  const searchString = searchInput.value;
  if (!isURL(searchString) || isEmpty(searchString)) {
    fsm.showError();
  } else {
    fsm.hideError();
  }
};

const onChangeInput = () => {
  validateInput();
  state.searchString = searchInput.value;
};

const onSubmitForm = (event) => {
  event.preventDefault();
  if (state.isValidForm) {
    fsm.search();
  } else {
    fsm.showError();
  }
};


searchInput.addEventListener('input', onChangeInput);
form.addEventListener('submit', onSubmitForm);
