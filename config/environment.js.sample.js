/* jshint node: true */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'fjarrkontroll-cli',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.APP.serviceURL = 'http://fjarrkontrollen-server-test.ub.gu.se';
    ENV.contentSecurityPolicyHeader = 'Disabled-Content-Security-Policy';
    ENV.APP.authenticationBaseURL = 'http://fjarrkontrollen-server-test.ub.gu.se/session';

  }

  if (environment === 'production-test') {
    ENV.APP.serviceURL = 'http://fjarrkontrollen-server-test.ub.gu.se';
    ENV.APP.authenticationBaseURL = 'http://fjarrkontrollen-server-test.ub.gu.se/session';
  }
  if (environment === 'production-demo') {
    ENV.APP.serviceURL = 'http://fjarrkontrollen-server-demo.ub.gu.se';
    ENV.APP.authenticationBaseURL = 'http://fjarrkontrollen-server-demo.ub.gu.se/session';
  }
  if (environment === 'production-live') {
    ENV.APP.serviceURL = 'http://fjarrkontrollen-server.ub.gu.se';
    ENV.APP.authenticationBaseURL = 'http://fjarrkontrollen-server.ub.gu.se/session';
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'auto';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
