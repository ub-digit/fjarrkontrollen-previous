import Ember from 'ember';

function fixNewLine(strObject) {
	return new Handlebars.SafeString(strObject.replace(/\n/g, "<br />"));
}	

export {
  fixNewLine
};

export default Ember.Handlebars.makeBoundHelper(fixNewLine);


