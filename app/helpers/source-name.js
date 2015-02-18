import Ember from 'ember';

function sourceName(sourceId) {
 	var applicationController = this.get("controllers.application");
	var source = applicationController.getSourceObject(sourceId);
	if (source) {
		return source.get("name");
	}
	else {
		return "Ingen källa är vald";
	}
}	

export {
  sourceName
};

export default Ember.Handlebars.makeBoundHelper(sourceName);
