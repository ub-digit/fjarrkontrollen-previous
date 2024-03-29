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





var get = Ember.get, getPath = Ember.getPath, set = Ember.set, fmt = Ember.String.fmt;
 
Ember.Select.reopen({
  optionDisabledPath: null
});
 
Ember.SelectOption.reopen({
  attributeBindings: ['disabled'],
 
  init: function() {
    this.disabledPathDidChange();
 
    this._super();
  },
 
  disabledPathDidChange: Ember.observer(function() {
    var valuePath = get(this, 'parentView.optionDisabledPath');
 
    if (!valuePath) { return; }
 
    Ember.defineProperty(this, 'disabled', Ember.computed(function() {
      return get(this, valuePath);
    }).property(valuePath));
  })
});