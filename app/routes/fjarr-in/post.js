import Ember from 'ember';
import ResetScroll from "fjarrkontroll-cli/mixins/reset-scroll";

export default Ember.Route.extend(ResetScroll,{
	model: function(param) {
		return Ember.RSVP.hash({
			order: this.store.find("order", param.id),
			notes: this.store.find("note", {order_id: param.id})
		});

	},

	beforeModel: function() {
		Ember.$("body").addClass("loading");
	},

	afterModel: function() {
		Ember.$("body").removeClass("loading");
	},

	setupController: function(controller, models) {
		controller.set("order", models.order);
		controller.set("notes", models.notes);
		controller.set("stickyNoteForThisOrder", controller.get("order.stickyNoteId"));
		controller.set("langForStandardAnswer", 'Svenska');
		console.log(this.controllerFor('fjarr-in.list').set("latestOrderViewed", models.order.get("orderNumber")));
	},

	deactivate: function() {
		this.controller.set("isEditingGlobalOrder", false);
		this.controller.set("isNewNoteVisible", false);
		this.controller.set("isNewMessageVisible", false);
		this.controller.set("addBibInfo", false);
		this.controller.set("bibInfo", "");
		this.controller.set("selectedAnswer", null);
		this.controller.set("isComingFromScanning", false);
	},

	actions:  {
	    refreshModel: function(modelId) {
	      this.refresh(modelId);
	    }	
	}
});
