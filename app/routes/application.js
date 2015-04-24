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
			email_template: this.store.find('email_template'),
			delivery_sources: this.store.find('delivery_source'),
		});
	},

	setupController: function(controller, models) {

		controller.set('defaultStatusGroup', 'all');
		controller.set('locations', models.locations);
		controller.set('statuses', models.statuses);

		controller.set('delivery_sources', models.delivery_sources);
		controller.set('status_groups', models.status_groups);
		controller.set('users', models.users);
		controller.set('ordertypes', models.ordertypes);
		controller.set('email_template', models.email_template); 
		if (this.get("session").get("userLocationId")) {
			this.controller.set("defaultLocation", this.get("session").get("userLocationId").toString());
		}

		/// make copy of status array and filter it to only active ones 
		var onlyActiveStatuses = this.controller.get('statuses').filter(function(item, index, enumerable){
			if (item.get("isActive")) {
				return item;
			}
		});
		controller.set("statusesActiveOnly", onlyActiveStatuses);


		/// make copy of status array and filter it to only active ones 
		var onlyActiveDeliverySources = this.controller.get('delivery_sources').filter(function(item, index, enumerable){
			if (item.get("isActive")) {
				return item;
			}
		});
		controller.set("deliverySourcesActiveOnly", onlyActiveDeliverySources);

		var tempArchivedFilter = [];
		//archivedFilter.push(Ember.Object.create({id:1, label: 'Visa både aktiva och arkiverade', value: null}));
		tempArchivedFilter.push(Ember.Object.create({id:1, label: 'Visa endast aktiva', value: false}));
		tempArchivedFilter.push(Ember.Object.create({id:2, label: 'Visa endast arkiverade', value: true}));
		controller.set("archivedFilter", tempArchivedFilter);

		if (dataLayer) {
			if (this.get("session.userLocationId")) {
				var locationid = this.get("session").get("userLocationId");
				var location = this.controllerFor("application").get("locations").findBy("id", locationid.toString());
				if (location) {
					var label = location.get("label");
					dataLayer.push({'userDefaultLocation': label});
				}
			}

			
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
				dataLayer.push({'event':'userLoggedIn'});
			}
	    	return this._super();	
	    },
		sessionAuthenticationFailed: function(error) {
		    this.controllerFor('login').set('error', error);
		},
		sessionInvalidationSucceeded: function() {
			if (dataLayer) {
				dataLayer.push({'event': 'userLoggedOut'});
			}
			Ember.run.later(this,this._super(), 100);
		}
    
	}
});
