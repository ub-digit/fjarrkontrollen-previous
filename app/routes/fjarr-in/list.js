import Ember from 'ember';

export default Ember.Route.extend({
	model: function() {
		if (this.controllerFor("fjarr-in.list")) {
			var filter = this.controllerFor("fjarr-in.list").get("filterToServer");
		}
		var result =  this.store.find('order', filter);	
		return result;
	},
	setupController: function(controller, model) {
		controller.set("model", model);
		console.log("from setupcontroller " , this.controllerFor("application").get("defaultLocation"));
		if (controller.folder.length === 0) {
			controller.folder.pushObject(Ember.Object.create({id: 1, name: 'Alla ordrar' , active: true, user: null}));
			controller.folder.pushObject(Ember.Object.create({id: 2, name: 'Mina ordrar', active: false, user: this.controllerFor('application').get('currentUser.id')}));
		}
	}
});
