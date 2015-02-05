import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {

	model: function() {
		return Ember.RSVP.hash({
		  locations: this.store.find('location'),
		 	statuses: this.store.find('status'),
		 	status_groups: this.store.find('status_group'),
		 	users: this.store.find('user'),
		  ordertypes: this.store.find('order_type'),
		  email_template: this.store.find('email_template')
		});
	},
	setupController: function(controller, models) {
		controller.set('defaultStatusGroup', 'all');
		controller.set('locations', models.locations);
		controller.set('statuses', models.statuses);
		controller.set('status_groups', models.status_groups);
		controller.set('users', models.users);
		controller.set('ordertypes', models.ordertypes);
		controller.set('email_template', models.email_template); 
		if (this.get("session").get("userLocationId")) {
			this.controller.set("defaultLocation", this.get("session").get("userLocationId").toString());
		}
	},
	actions: {
		sessionAuthenticationSucceeded: function() {
	    	this.controller.set("defaultLocation", this.get("session").get("userLocationId").toString());
			if (dataLayer) {
				var locationid = this.get("session").get("userLocationId");
				var location = this.controller.get("locations").findBy("id", locationid.toString());
				var label = location.get("label");
				dataLayer.push({'userDefaultLocation': label});
			}
	    	return this._super();	
	    },
		sessionAuthenticationFailed: function(error) {
		    this.controllerFor('login').set('error', error);
		}
    
	}
});
