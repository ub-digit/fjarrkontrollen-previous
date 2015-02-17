import Ember from 'ember';

function markIfLastOrderVisited(id) {
	if (this.get("latestOrderViewed") === id) {
		return new Handlebars.SafeString("success");
	}
}	

export {
  markIfLastOrderVisited
};

export default Ember.Handlebars.makeBoundHelper(markIfLastOrderVisited);


