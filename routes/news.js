var Router = require('koa-router');
var util = require('../utility/util');
var axios = require('axios');

const router = new Router({ prefix: '/post' })
const { getSlides, parseHTML, getCta } = util;

async function getPost(ctx, next){
  const postId = String(ctx.params.postid);
  const getSinglePost = () => axios.get(`http://harston-api.esy.es/wp-json/wp/v2/posts/${postId}`);
  const getNews = () => axios.get("http://harston-api.esy.es/wp-json/wp/v2/posts");
  const getTags = () => axios.get("http://harston-api.esy.es/wp-json/wp/v2/tags");

  await axios.all([getSinglePost(), getNews(), getTags()])
    .then(axios.spread((post, news, tags) => {
      ctx.render('news_post', {
        content: post.data.content.rendered,
        acf: post.data.acf,
        news: [...news.data],
        tags: tags.data.map(tag => tag.name)
      });
    })
    )
    .catch(err => {
      ctx.body = 'failed data request';
      console.error('failed request')
    });
}

router.get('/:postid', getPost);

export default router
