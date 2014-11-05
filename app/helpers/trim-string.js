import Ember from 'ember';

function trimString(passedString) {
    if (passedString) {
     	return new Handlebars.SafeString(passedString.substring(0,30)+'...');
    }
    else {
    	return new Handlebars.SafeString('...');
    }
}

export {
  trimString
};

export default Ember.Handlebars.makeBoundHelper(trimString);
