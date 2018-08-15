var koa = require('koa');
var serve = require('koa-static');
var views = require('koa-views');

var app = new koa();
var Pug = require('koa-pug');
var staticCache = require('koa-static-cache');

var rootRoutes = require('./routes/index');
var newsRoutes = require('./routes/news');

// app.use(staticCache(path.join(__dirname, 'public'), {
//    maxAge: 365 * 24 * 60 * 60  //Add these files to caches for a year
// }))

var pug = new Pug({
  viewPath: './views',
  basedir: './views',
  app: app //Equivalent to app.use(pug)
});

//app.use(views(`${__dirname}/views`, { extension: 'pug' }))
app.use(serve(`${__dirname}/public`));

app.use(rootRoutes.routes(), rootRoutes.allowedMethods());
app.use(newsRoutes.routes(), newsRoutes.allowedMethods());

app.listen(3000, function () {
  console.log('Server running on https://localhost:3000')
});
