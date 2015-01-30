import Ember from 'ember';

export default Ember.Route.extend({
	beforeModel: function(params) {
		this.transitionTo('search.orders', params);
	}
	
});
