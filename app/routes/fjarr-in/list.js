import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function() {
		if (Ember.$("body")) {
			Ember.$("body").addClass("loading");
		}
	},
	model: function() {
		var temp = this.controllerFor("fjarr-in.list").get("firstLoad");
		if (temp === true) {
			this.controllerFor("fjarr-in.list").set("firstLoad", false);
			return null;
		}
		else {
			if (this.controllerFor("fjarr-in.list")) {
				var filter = this.controllerFor("fjarr-in.list").get("filterToServer");
			}
			var result =  this.store.find('order', filter);	
			return result;
			
		}
	},
	afterModel: function() {
		if (Ember.$("body")) {
			Ember.$("body").removeClass("loading");
		}
	},

	setupController: function(controller, model) {
		controller.set("model", model);
		var meta = controller.get("model.meta");
		if (!controller.get("currentLocation")) {
			controller.set("currentLocation", this.controllerFor('application').get("defaultLocation"));
		}
		if (!controller.get("currentStatusGroup")) {
			controller.set("currentStatusGroup", this.controllerFor('application').get("defaultStatusGroup"));
		}

	}
});
