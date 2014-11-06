import Ember from 'ember';

function statusName(statusId) {
 	var applicationController = this.get("controllers.application");
	var status = applicationController.getStatusObject(statusId);
	console.log("status from helper " + status.get("nameSv"));
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
