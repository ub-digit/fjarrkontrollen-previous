import Ember from 'ember';

export default Ember.Route.extend({
	renderTemplate: function() {
		this.render('fjarr-in');
		this.render('test', {
		    outlet: 'modal'
		});
	}
});



