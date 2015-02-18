import Ember from 'ember';

function isThisAStickyNote(noteId, isThisStickyNoteOnThisOrder) {

	if (noteId === isThisStickyNoteOnThisOrder)
	{
  		return new Handlebars.SafeString("<i class='fa fa-thumb-tack active'></i>");
	}
  	else
  	{
  		return new Handlebars.SafeString("<i class='fa fa-thumb-tack'></i>");
  	}

}	

export {
  isThisAStickyNote
};

export default Ember.Handlebars.makeBoundHelper(isThisAStickyNote);


