import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
	needs: ['fjarr-in/post'],
	barcodeIsVisible: false,
	orderNumber: '',
	error: '',


	isEnabled: function() {
		if (this.get("orderNumber").length === 0) {
			return false;
		}
		else {
			return true;
		}
	}.property('orderNumber'),

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
			this.set("orderNumber", "");
			this.set("barcodeIsVisible", true);
			this.set("error", false);
		},
		submitBarcodeForm: function() {

			var val = this.get("orderNumber");
			 // If you set the event.returnValue to a promise, ic-modal-form
			  // will set its 'awaiting-return-value' to true, that's why our
			  // `{{#if saving}}` in the template works. You also get an
			  // attribute on the component to style it differently, see the css
			  // section about that. You don't need to set the `event.returnValue`.
			var that = this;
			this.store.find('order', val).then(function(result) {	
					that.set("barcodeIsVisible", false);	
					that.set("barcodeIsHidden", true);
					that.transitionToRoute("fjarr-in.postscanned", result.get("id"));

			  }, function() {
			  	that.set("error", "Ingen order med numret hittades");
			  });


		},
	}
});
