import DS from 'ember-data';

export default DS.Model.extend({
	nameSv: 	DS.attr('string'),
	isActive: 	DS.attr('boolean'),
	isDisabled: function() {
    	if (this.get("isActive") === true) {
    		return 	false;
    	}
    	else {
    		return true;
    	}
  }.property('isActive')
});
