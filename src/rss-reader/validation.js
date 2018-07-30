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
    check: (searchString, rssChannels) => rssChannels.find(({ url }) => url === searchString),
    value: 'This URL is already exists',
  },
];

export default (searchString, rssChannels) => {
  const message = messages.find(({ check }) => check(searchString, rssChannels));
  return message && message.value;
};
