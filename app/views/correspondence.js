import Ember from 'ember';

export default Ember.View.extend({
	templateName: 'fjarr-in/correspondence',
	didInsertElement: function() {
		this.get("controller").on("disable-message-btn", this, this.disable);
		this.get("controller").on("enable-message-btn", this, this.enable);

		this.get("controller").on("enable-emailmessage-btn", this, this.enableEmailBtn);
		this.get("controller").on("disable-emailmessage-btn", this, this.disableEmailBtn);
	},

	setFocus: function() {
		if (this.$("textarea")) {
			this.$("textarea").focus();
		}
	}.observes('controller.selectedAnswer'),

	enable: function() {
		$("#notes-submit").removeClass("disabled");
	},
	disable: function() {
		$("#notes-submit").addClass("disabled");
	},

	enableEmailBtn: function() {
		$("#email-submit").removeClass("disabled");
	},

	disableEmailBtn: function() {
		$("#email-submit").addClass("disabled");
	}


});
