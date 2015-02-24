import Ember from 'ember';

function orderName(orderTypeId) {
 	var applicationController = this.get("controllers.application");
	var ordertype = applicationController.getOrderTypeObject(orderTypeId);
	//console.log("orderType from helper " + ordertype.get("nameSv"));
	if (ordertype) {
		return ordertype.get("nameSv");
	}
	else {
		return "missing status: " + orderTypeId;
	}
}	

export {
  orderName
};

export default Ember.Handlebars.makeBoundHelper(orderName);
