import Ember from 'ember';

function userName(locationId) {
 	var applicationController = this.get("controllers.application");
	var location = applicationController.getLocationObject(locationId);

	if (location) {
		return location.get("nameSv");
	}
	else {
		return "missing user: " + userId;
	}
}	

export {
  userName
};

export default Ember.Handlebars.makeBoundHelper(userName);
