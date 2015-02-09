import Ember from 'ember';


export default Ember.Controller.extend({
	actions: {
		hideBarcodeForm: function() {
			this.set("barcodeFormVisible", false);
		}
	}
});