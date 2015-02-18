import Ember from 'ember';

function userName(userId) {
 	var applicationController = this.get("controllers.application");
	var user = applicationController.getUserObject(userId);
	if (user) {
		return user.get("xkonto");
	}
	else {
		return "missing user: " + userId;
	}
}	

export {
  userName
};

export default Ember.Handlebars.makeBoundHelper(userName);
