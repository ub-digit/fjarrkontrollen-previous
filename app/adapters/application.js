import DS from 'ember-data';
import ENV from '../config/environment';

export default DS.ActiveModelAdapter.extend({
    	host: ENV.APP.serviceURL,
	    ajax: function(url, type, hash) {
			if (Ember.isEmpty(hash)) { hash = {}; }
			if (Ember.isEmpty(hash.data)) { hash.data = {}; }
			hash.data.token = this.container.lookup('route:application').get('session.token');
			return this._super(url, type, hash);
	    }

});	


DS.Model.reopen({
    idInt: function() {
	if(!this.get('id')) { return undefined; }
	return parseInt(this.get('id'));
    }.property('id')
});