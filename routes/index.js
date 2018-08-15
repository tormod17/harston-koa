var Router = require('koa-router');
var util = require('../utility/util');
var axios = require('axios');

const router = new Router();
const { getSlides, parseHTML, getCta } = util;

async function getHome(ctx, next) {
  const getPage = () => axios.get("http://harston-api.esy.es/wp-json/wp/v2/pages/2");
  const getReviews = () => axios.get("http://harston-api.esy.es/wp-json/wp/v2/reviews");
  await axios.all([getPage(), getReviews()])
    .then(axios.spread((page, reviews) => {
      ctx.render('index', {
          ...page.data.acf,
          company_aboutus: parseHTML(page.data.acf.company_aboutus),
          slides: getSlides(page.data.acf),
          ...getCta(page.data.acf.cta_content),
          reviews: reviews.data.map( r => r.acf)
      });
    })
    )
    .catch(err => {
      ctx.body = 'failed data request';
      console.error('failed request')
    });
}

async function getProfile(ctx, next) {
  const getPage = () => axios.get("http://harston-api.esy.es/wp-json/wp/v2/pages/2");
  const getTeam = () => axios.get("http://harston-api.esy.es/wp-json/wp/v2/team");
  await axios.all([getPage(), getTeam()])
    .then(axios.spread((page, team) => {
      ctx.render('profile', {
        ...page.data.acf,
        company_aboutus: parseHTML(page.data.acf.company_aboutus),
        team: team.data.map(r => r.acf)
      });
    })
    )
    .catch(err => {
      ctx.body = 'failed data request';
      console.error('failed request')
    });
}

async function getNews(ctx, next){
  const getPage = () => axios.get("http://harston-api.esy.es/wp-json/wp/v2/pages/2");
  const getNews = () => axios.get("http://harston-api.esy.es/wp-json/wp/v2/posts");
  const getTags = () => axios.get("http://harston-api.esy.es/wp-json/wp/v2/tags");
  await axios.all([getPage(), getNews(), getTags()])
    .then(axios.spread((page, news, tags) => {
      ctx.render('news', {
        ...page.data.acf,
        company_aboutus: parseHTML(page.data.acf.company_aboutus),
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

router.get('/', getHome);
router.get('/profile', getProfile);
router.get('/news', getNews);

export default router

