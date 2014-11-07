import Ember from 'ember';

function fixNewLine(strObject) {
	if (strObject)
	{
  		return new Handlebars.SafeString(strObject.replace(/\n/g, "<br />"));
	}
  	else
  	{
  		return "";
  	}

}	

export {
  fixNewLine
};

export default Ember.Handlebars.makeBoundHelper(fixNewLine);


