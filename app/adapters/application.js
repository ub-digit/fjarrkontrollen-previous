import DS from 'ember-data';
import ENV from '../config/environment';

export default DS.ActiveModelAdapter.extend({
	    host: ENV.APP.serviceURL,

});	


DS.Model.reopen({
    idInt: function() {
	if(!this.get('id')) { return undefined; }
	return parseInt(this.get('id'));
    }.property('id')
});