import Ember from 'ember';

export default Ember.View.extend({
	shake: function() {
	  	var l = 20;  
	  	if (this.controller.get("error") !== "") {
		  if (this.$(".panel")) {
		  	for( var i = 0; i < 10; i++ )   {
				this.$(".panel").animate( { 'margin-left': "+=" + ( l = -l ) + 'px' }, 50);  
		   	}
		  };
		}
	}.observes('controller.error'),

	click: function(evt) {
		if ((evt.target.id === "input-account") || (evt.target.id === "input-password")) {
			this.controller.set("error", "");
		}
	}
});
