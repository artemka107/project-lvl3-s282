import { isURL, isEmpty } from 'validator';

const messages = [
  {
    check: searchString => isEmpty(searchString),
    value: 'Plese fill the field',
  },
  {
    check: searchString => !isURL(searchString),
    value: 'Incorrect chanel URL',
  },
  {
    check: (searchString, channels) => channels.find(channel => channel === searchString),
    value: 'This URL is already exists',
  },
];

export default (searchString, channels) => {
  const message = messages.find(({ check }) => check(searchString, channels));
  return message && message.value;
};
