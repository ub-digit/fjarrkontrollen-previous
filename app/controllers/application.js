import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
	needs: ['fjarr-in/post'],
	barcodeIsVisible: false,

	getUserObject: function(id) {
		return this.get("users").findBy('idInt', parseInt(id));
	},

	getLocationObject: function(id) {
		return this.get("locations").findBy('idInt', parseInt(id));
	},
	getStatusObject: function(id) {
		return this.get("statuses").findBy('idInt', parseInt(id));	
	},
	getOrderTypeObject: function(id) {
		return this.get("ordertypes").findBy('idInt', parseInt(id));
	},

	actions: {
		triggerModal: function() {
			this.set("barcodeIsVisible", true);
		},
		submitBarcodeForm: function(modal, event) {
			var val = modal.$el.find("input").val();
			 // If you set the event.returnValue to a promise, ic-modal-form
			  // will set its 'awaiting-return-value' to true, that's why our
			  // `{{#if saving}}` in the template works. You also get an
			  // attribute on the component to style it differently, see the css
			  // section about that. You don't need to set the `event.returnValue`.
				
			  event.returnValue = this.store.find('order', val).then(function(result) {
			  	if (!result) {
			  		alert("No Result");
			  	}
			  	else {
					this.transitionToRoute("fjarr-in.postscanned", result.get("id"));
			  	}
			  }.bind(this));

			  console.log(event.returnValue);

		},
		restoreModel: function(modal) {

	    }
	}
});
