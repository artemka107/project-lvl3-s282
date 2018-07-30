import { uniqueId } from 'lodash';

const getArticleInfoByTag = (rssArticle) => {
  const tags = ['title', 'description', 'link', 'pubDate'];
  return tags.reduce((acc, tagName) => {
    const [tagNode] = rssArticle.getElementsByTagName(tagName);
    const value = tagNode.textContent;
    return { ...acc, [tagName]: value };
  }, {});
};

export default (rssString) => {
  const parser = new DOMParser();
  const rss = parser.parseFromString(rssString, 'application/xml');
  const rssArticles = [...rss.getElementsByTagName('item')]
    .map(elem => ({
      ...getArticleInfoByTag(elem),
      localId: uniqueId(),
    }));
  return rssArticles;
};
