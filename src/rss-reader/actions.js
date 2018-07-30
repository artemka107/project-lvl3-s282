import axios from 'axios';
import parseXml from './xmlParser';

export const getRssChannel = (url) => {
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

export const getUpdatedChannels = channels =>
  channels.reduce((acc, channel) =>
    getRssChannel(channel.url)
      .then((newChannel) => {
        const [lastUpdatedArticle] = channel.articles;
        const lastArticleTime = new Date(lastUpdatedArticle.pubDate).valueOf();
        const newArticles = newChannel.articles.filter((article) => {
          const newArticleTime = new Date(article.pubDate).valueOf();
          return newArticleTime > lastArticleTime;
        });
        const hasUpdatedArticles = newArticles.length;
        const updatedChannel = {
          url: channel.url,
          articles: newArticles,
        };
        return hasUpdatedArticles ? [...acc, updatedChannel] : acc;
      }), []);

export const updateChannels = (channels, state) => {
  const updatedChannels = getUpdatedChannels(channels);
  updatedChannels.then((newChannels) => {
    const newRssChannels = channels.map((oldChannel) => {
      const updatedChannel = newChannels.find(newChannel => newChannel.url === oldChannel.url);
      const newElement = {
        url: oldChannel.url,
        articles: [...updatedChannel.articles, ...oldChannel.articles],
      };
      return updatedChannel ? newElement : oldChannel;
    });
    state.changeState({ rssChannels: newRssChannels });
  });
};
