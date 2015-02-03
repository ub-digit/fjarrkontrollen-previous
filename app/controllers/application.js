import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
	barcodeIsVisible: true,

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
		submitBarcodeForm: function(modal, event) {

			var val = modal.$el.find("input").val();
			this.transitionToRoute("fjarr-in.post", val);

		}
	}
});
