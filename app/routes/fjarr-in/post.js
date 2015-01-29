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
	},

	deactivate: function() {
		this.controller.set("isEditingGlobalOrder", false);
		this.controller.set("isNewNoteVisible", false);
		this.controller.set("isNewMessageVisible", false);
		this.controller.set("addBibInfo", false);
		this.controller.set("bibInfo", "");
		this.controller.set("selectedAnswer", null);


	}
});
