import axios from 'axios';
import parseXml from './xmlParser';

export default (url) => {
  const proxyCors = 'https://cors-anywhere.herokuapp.com/';

  return axios.get(`${proxyCors}${url}`)
    .then(({ data: rssString }) => {
      const articles = parseXml(rssString);
      const newChannel = {
        url,
        articles,
      };
      return newChannel;
    });
};
