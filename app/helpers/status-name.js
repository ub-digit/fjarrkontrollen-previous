import Ember from 'ember';

function statusName(statusId) {
 	var applicationController = this.get("controllers.application");
	var status = applicationController.getStatusObject(statusId);
	if (status) {
		return status.get("nameSv");
	}
	else {
		return "missing status: " + statusId;
	}
}	

export {
  statusName
};

export default Ember.Handlebars.makeBoundHelper(statusName);
