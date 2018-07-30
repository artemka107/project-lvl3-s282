import axios from 'axios';
import { flatten } from 'lodash';
import parseXml from './xmlParser';

export const getRssChannel = (url) => {
  const proxyCors = 'https://cors-anywhere.herokuapp.com/';

  return axios.get(`${proxyCors}${url}`)
    .then(({ data: rssString }) => {
      const articles = parseXml(rssString);
      return articles;
    });
};

export const updateChannels = channels =>
  channels.reduce((acc, channel) =>
    acc.concat(getRssChannel(channel)), []);

export const getUpdatedArticles = (state) => {
  const updatedChannels = updateChannels(state.data.channels);
  return Promise.all(updatedChannels)
    .then((newArticlesData) => {
      const newArticles = flatten(newArticlesData);
      const updatedArticles = newArticles.reduce((acc, newArticle) => {
        const hasTheSameArticle = state.data.articles
          .find(oldArticle => oldArticle.link === newArticle.link);
        return hasTheSameArticle ? acc : [...acc, newArticle];
      }, []);
      state.changeState({
        updatedArticles,
        articles: newArticles,
      });
    })
    .finally(() => setTimeout(getUpdatedArticles, 5000, state));
};
