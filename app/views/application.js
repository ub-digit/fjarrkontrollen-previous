import Ember from 'ember';

export default Ember.View.extend({


	didInsertElement: function () {
		var that = this;
	   Ember.$("body").keydown(function(key) {
		if (key.keyCode === 113) {
			that.controller.set("barcodeIsVisible", true);
		}
		if (key.keyCode === 27) {
			that.controller.set("barcodeIsVisible", false);
		}
	  });
	}

});
