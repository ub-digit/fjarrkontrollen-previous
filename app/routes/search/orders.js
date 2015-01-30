import AuthenticatedRouteMixin from 'simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
	beforeModel: function() {
		if (Ember.$("body")) {
			Ember.$("body").addClass("loading");
		}
	},
	model: function(params) {
		// get data 
		//var query = params.query;
		var result = this.store.find('order');
		return result;
	},

	afterModel: function() {
		if (Ember.$("body")) {
			Ember.$("body").removeClass("loading");
		}
	},
	setupController: function(controller, model) {
		controller.set("model", model);
	}
});