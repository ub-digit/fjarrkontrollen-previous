import Ember from 'ember';
import Base from 'simple-auth/authenticators/base';
import ENV from '../config/environment';

var CustomAuthenticator = Base.extend({
    restore: function(properties) {
		return new Ember.RSVP.Promise(function(resolve, reject) {
		    Ember.$.ajax({
			type: 'GET',
			url: ENV.APP.authenticationBaseURL+'/'+properties.token
		    }).then(function() {
			resolve(properties);
		    }, function() {
			reject();
		    });
		});
    },
    authenticate: function(credentials) {
		return new Ember.RSVP.Promise(function(resolve, reject) {
		    Ember.$.ajax({
			type: 'POST',
			url: ENV.APP.authenticationBaseURL,
			data: JSON.stringify({
			    xkonto: credentials.identification,
			    password: credentials.password
			}),
			contentType: 'application/json'
		    }).then(function(response) {
			var token = response.access_token;
			Ember.run(function() {
			    resolve({
				authenticated: true,
				token: token,
				username: response.user.xkonto,
				userid: response.user.id,
				name: response.user.name
			    });
			});
		    }, function(xhr, status, error) {
			Ember.run(function() {
			    reject(error);
			});
		    });
		});
	 },
    invalidate: function() {
		return new Ember.RSVP.Promise(function(resolve) {
		    resolve();
		});
    }
});

export var initialize = function(container) {
  container.register('authenticator:custom', CustomAuthenticator);

};

export default {
  name: 'authentication',
  before: 'simple-auth',
  initialize: initialize
};