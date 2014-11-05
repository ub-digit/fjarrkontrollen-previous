import Ember from 'ember';

export default Ember.Route.extend({
	model: function(param) {
		return Ember.RSVP.hash({
			order: this.store.find("order", param.id),
			notes: this.store.find("note", {order_id: param.id})
		});

	},
	setupController: function(controller, models) {
		controller.set("order", models.order);
		controller.set("notes", models.notes);
	}
});
