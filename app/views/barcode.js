import Ember from 'ember';

export default Ember.View.extend({
	templateName: 'fjarr-in/barcode',
	didInsertElement: function() {
		this.setFocus();
	},

	setFocus: function() {
		console.log(this.$("input"));
		if (this.$("input")) {
			this.$("input").focus();
		}
	},


	click: function(ev) {
		if (ev.target.id === "close") {
			// hide form
			this.get("controller").send("hideBarcodeForm");
		}
		else if (ev.target.id === "submit") {
			// go to route with id
			if (this.$("#input-barcode").val()) {
				alert(this.$("#input-barcode").val());
			}
			this.get("controller").send("goToOrder");
		}

	}



});
