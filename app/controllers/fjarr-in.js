import Ember from 'ember';


export default Ember.Controller.extend({
	tacosOrdered: true,
	actions: {
		hideBarcodeForm: function() {
			this.set("barcodeFormVisible", false);
		},
		goToOrder: function (id) {
			alert("go there");
		},
		showModal: function() {
			this.set("tacosOrdered", false);
		}
	}
});