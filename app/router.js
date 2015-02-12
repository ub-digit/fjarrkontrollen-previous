import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.resource('fjarr-in', function() {
  	this.route('list');
    this.route('post',  {path: ":id"});	
    this.route('postscanned', {path: "postscanned/:id"});
  });
  
  this.resource('login');

});

export default Router;
