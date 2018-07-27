import bindEvents from './controller';
import { initListenToState } from './dom';

export default () => {
  bindEvents();
  initListenToState();
};
