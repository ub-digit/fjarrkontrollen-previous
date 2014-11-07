import Ember from 'ember';
import ENV from '../config/environment';

export default Ember.Controller.extend({
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
});