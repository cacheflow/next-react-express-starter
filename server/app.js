/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');
const logger = require('morgan');
const next = require('next');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const lusca = require('lusca');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo')(session);
const flash = require('express-flash');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const expressValidator = require('express-validator');
const expressStatusMonitor = require('express-status-monitor');
const sass = require('node-sass-middleware');
const multer = require('multer');

const upload = multer({ dest: path.join(__dirname, 'uploads') });

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */

dotenv.load({ path: '../.env.example' });

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })

/**
 * Controllers (route handlers).
 */
const homeController = require('./controllers/home');
const userController = require('./controllers/user');
const apiController = require('./controllers/api');
const contactController = require('./controllers/contact');

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('../config/passport');

/**
 * Create Express server.
 */


 const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();


  /**
   * Express configuration.
   */
  server.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
  server.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080);
  server.use(expressStatusMonitor());
  server.use(compression());
  server.use(logger('dev'));
  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({ extended: true }));
  server.use(expressValidator());
  server.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
    store: new MongoStore({
      url: process.env.MONGODB_URI,
      autoReconnect: true,
    })
  }));
  // server.use(passport.initialize());
  // server.use(passport.session());
  // server.use(flash());
  // server.use((req, res, next) => {
  //   if (req.path === '/api/upload') {
  //     next();
  //   } else {
  //     lusca.csrf()(req, res, next);
  //   }
  // });
  // server.use(lusca.xframe('SAMEORIGIN'));
  // server.use(lusca.xssProtection(true));
  // server.disable('x-powered-by');
  // server.use((req, res, next) => {
  //   res.locals.user = req.user;
  //   next();
  // });
  // server.use((req, res, next) => {
  //   // After successful login, redirect back to the intended page
  //   if (!req.user
  //     && req.path !== '/login'
  //     && req.path !== '/signup'
  //     && !req.path.match(/^\/auth/)
  //     && !req.path.match(/\./)) {
  //     req.session.returnTo = req.originalUrl;
  //   } else if (req.user
  //     && (req.path === '/account' || req.path.match(/^\/api/))) {
  //     req.session.returnTo = req.originalUrl;
  //   }
  //   next();
  // });
  // server.use('/', express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));
  // server.use('/js/lib', express.static(path.join(__dirname, 'node_modules/popper.js/dist/umd'), { maxAge: 31557600000 }));
  // server.use('/js/lib', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js'), { maxAge: 31557600000 }));
  // server.use('/js/lib', express.static(path.join(__dirname, 'node_modules/jquery/dist'), { maxAge: 31557600000 }));
  // server.use('/webfonts', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free/webfonts'), { maxAge: 31557600000 }));

  /**
   * Primary server routes.
   */
  // server.get('/', homeController.index);
  // server.get('/login', userController.getLogin);
  // server.post('/login', userController.postLogin);
  // server.get('/logout', userController.logout);
  // server.get('/forgot', userController.getForgot);
  // server.post('/forgot', userController.postForgot);
  // server.get('/reset/:token', userController.getReset);
  // server.post('/reset/:token', userController.postReset);
  // server.get('/signup', userController.getSignup);
  // server.post('/signup', userController.postSignup);
  // server.get('/contact', contactController.getContact);
  // server.post('/contact', contactController.postContact);
  // server.get('/account', passportConfig.isAuthenticated, userController.getAccount);
  // server.post('/account/profile', passportConfig.isAuthenticated, userController.postUpdateProfile);
  // server.post('/account/password', passportConfig.isAuthenticated, userController.postUpdatePassword);
  // server.post('/account/delete', passportConfig.isAuthenticated, userController.postDeleteAccount);
  // server.get('/account/unlink/:provider', passportConfig.isAuthenticated, userController.getOauthUnlink);

  /**
   * API examples routes.
   */
  // server.get('/api', apiController.getApi);
  // server.get('/api/lastfm', apiController.getLastfm);
  // server.get('/api/nyt', apiController.getNewYorkTimes);
  // server.get('/api/aviary', apiController.getAviary);
  // server.get('/api/steam', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getSteam);
  // server.get('/api/stripe', apiController.getStripe);
  // server.post('/api/stripe', apiController.postStripe);
  // server.get('/api/scraping', apiController.getScraping);
  // server.get('/api/twilio', apiController.getTwilio);
  // server.post('/api/twilio', apiController.postTwilio);
  // server.get('/api/clockwork', apiController.getClockwork);
  // server.post('/api/clockwork', apiController.postClockwork);
  // server.get('/api/foursquare', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFoursquare);
  // server.get('/api/tumblr', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getTumblr);
  // server.get('/api/facebook', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getFacebook);
  // server.get('/api/github', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getGithub);
  // server.get('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getTwitter);
  // server.post('/api/twitter', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.postTwitter);
  // server.get('/api/linkedin', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getLinkedin);
  // server.get('/api/instagram', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getInstagram);
  // server.get('/api/paypal', apiController.getPayPal);
  // server.get('/api/paypal/success', apiController.getPayPalSuccess);
  // server.get('/api/paypal/cancel', apiController.getPayPalCancel);
  // server.get('/api/lob', apiController.getLob);
  // server.get('/api/upload', apiController.getFileUpload);
  // server.post('/api/upload', upload.single('myFile'), apiController.postFileUpload);
  // server.get('/api/pinterest', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.getPinterest);
  // server.post('/api/pinterest', passportConfig.isAuthenticated, passportConfig.isAuthorized, apiController.postPinterest);
  // server.get('/api/google-maps', apiController.getGoogleMaps);
  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.get('/home', (req, res) => {
    const actualPage = '/index';
    console.log('req is ', req)
    console.log("res is ", res);
    app.render(req, res, actualPage, req.query);
  });
  /**k
   * OAuth authentication routes. (Sign in)
   */
  // server.get('/auth/instagram', passport.authenticate('instagram'));
  // server.get('/auth/instagram/callback', passport.authenticate('instagram', { failureRedirect: '/login' }), (req, res) => {
  //   res.redirect(req.session.returnTo || '/');
  // });
  // server.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
  // server.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
  //   res.redirect(req.session.returnTo || '/');
  // });
  // server.get('/auth/github', passport.authenticate('github'));
  // server.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
  //   res.redirect(req.session.returnTo || '/');
  // });
  // server.get('/auth/google', passport.authenticate('google', { scope: 'profile email' }));
  // server.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  //   res.redirect(req.session.returnTo || '/');
  // });
  // server.get('/auth/twitter', passport.authenticate('twitter'));
  // server.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/login' }), (req, res) => {
  //   res.redirect(req.session.returnTo || '/');
  // });
  // server.get('/auth/linkedin', passport.authenticate('linkedin', { state: 'SOME STATE' }));
  // server.get('/auth/linkedin/callback', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
  //   res.redirect(req.session.returnTo || '/');
  // });

  /**
   * OAuth authorization routes. (API examples)
   */
  // server.get('/auth/foursquare', passport.authorize('foursquare'));
  // server.get('/auth/foursquare/callback', passport.authorize('foursquare', { failureRedirect: '/api' }), (req, res) => {
  //   res.redirect('/api/foursquare');
  // });
  // server.get('/auth/tumblr', passport.authorize('tumblr'));
  // server.get('/auth/tumblr/callback', passport.authorize('tumblr', { failureRedirect: '/api' }), (req, res) => {
  //   res.redirect('/api/tumblr');
  // });
  // server.get('/auth/steam', passport.authorize('openid', { state: 'SOME STATE' }));
  // server.get('/auth/steam/callback', passport.authorize('openid', { failureRedirect: '/api' }), (req, res) => {
  //   res.redirect(req.session.returnTo);
  // });
  // server.get('/auth/pinterest', passport.authorize('pinterest', { scope: 'read_public write_public' }));
  // server.get('/auth/pinterest/callback', passport.authorize('pinterest', { failureRedirect: '/login' }), (req, res) => {
  //   res.redirect('/api/pinterest');
  // });

  /**
   * Error Handler.
   */
  if (process.env.NODE_ENV === 'development') {
    // only use in development
    server.use(errorHandler());
  } else {
    server.use((err, req, res, next) => {
      console.error(err);
      res.status(500).send('Server Error');
    });
  }

  /**
   * Start Express server.
   */
  server.listen(3000, () => {
    console.log("port is ", server.get('port'))
    console.log('%s server is running at http://localhost:8080 in %s mode', chalk.green('✓'), server.get('port'), server.get('env'));
    console.log('  Press CTRL-C to stop\n');
  });
})
  .catch((ex) =>{
    console.error(ex.stack)
    process.exit(1)
})

/**
 * Connect to MongoDB.
 */
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect("")
mongoose.connection.on('error', (err) => {
  console.error(err);
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
  process.exit();
});

module.exports = app;
