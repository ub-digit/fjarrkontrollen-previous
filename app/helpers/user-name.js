import Ember from 'ember';

function userName(userId) {
 	var applicationController = this.get("controllers.application");
	var user = applicationController.getUserObject(userId);
	console.log("user from helper " + user)
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
