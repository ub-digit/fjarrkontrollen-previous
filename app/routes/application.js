import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {

	model: function() {
		return Ember.RSVP.hash({
		  locations: this.store.find('location'),
		 	statuses: this.store.find('status'),
		 	users: this.store.find('user'),
		  ordertypes: this.store.find('order_type'),
		  email_template: this.store.find('email_template')
		});
	},
	setupController: function(controller, models) {
		controller.set('defaultStatus', '0');
		controller.set('locations', models.locations);
		controller.set('statuses', models.statuses);
		controller.set('users', models.users);
		controller.set('ordertypes', models.ordertypes);
		controller.set('email_template', models.email_template); 
	},
	actions: {
		sessionAuthenticationSucceeded: function() {
	    	this.controller.set("defaultLocation", this.get("session").get("userLocationId").toString());
	    	return this._super();	

	    }
	}
});
