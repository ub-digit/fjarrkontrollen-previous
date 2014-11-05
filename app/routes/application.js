import Ember from 'ember';
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {

	model: function() {
		return Ember.RSVP.hash({
		  locations: this.store.find('location'),
		 	statuses: this.store.find('status'),
		 	users: this.store.find('user'),
		 	currentUser: this.store.find('user',8),
		  order_type: this.store.find('order_type'),
		  email_template: this.store.find('email_template')
		});
	},
	setupController: function(controller, models) {
		controller.set('currentUser',models.currentUser);
		controller.set('defaultLocation', '1');
		controller.set('defaultStatus', 0);
		controller.set('locations', models.locations);
		controller.set('statuses', models.statuses);
		controller.set('users', models.users);
		controller.set('order_type', models.order_type);
		controller.set('email_template', models.email_template);
		// insert extra object in statuses to add an all filter.. 
		this.store.push('status', {id: 0, nameSv: "Alla"});
	}	
});
