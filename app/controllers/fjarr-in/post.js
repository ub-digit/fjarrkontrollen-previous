import Ember from 'ember';
import ENV from '../../config/environment';

export default Ember.Controller.extend(Ember.Evented, {
	needs: ['application'],
	isComingFromScanning: false, 
	isEditingGlobalOrder: false,
	isNewMessageVisible: false,
	isNewNoteVisible: false, 
	addBibInfo: false,
	bibInfo: "",
	stickyNoteForThisOrder: null,


	isToDisplayStandardAnswerInSwedish: function() {
		if (this.get("langForStandardAnswer") === "Svenska") {
			return true;
		}
		else {
			return false;
		}
	}.property('langForStandardAnswer'),

	stickyNoteChanged: function() {
		// change stickyNoteForOrder and save
		this.set("order.stickyNoteId", this.get("stickyNoteForThisOrder"));
		var self = this;
		var onSuccess = function() {
			//self.set("controllers.application.message", "Order " + self.get("model.orderNumber") + " har sparats.");
		}
		var onError = function() {
		}
		this.get("order").save().then(onSuccess, onError);
	}.observes('stickyNoteForThisOrder'),



	generateBibInfo: function() {
		var title = "";
		var customerStr = ""; 
		var authorStr = "";
		var journalTitle = "";
		var ordernumberStr = "";




		if (this.get("order.name")) {
			var customerHeading = "Låntagare";
			if (this.get("langForStandardAnswer") === "Engelska") {
				customerHeading = "Patron";
			}	
			customerStr = customerHeading + ': ' + this.get("order.name") + "\n";
		}
		if (this.get("order.title")) {
			var titelHeading = "Titel";
			if (this.get("langForStandardAnswer") === "Engelska") {
				titelHeading = "Title";
			}	
			title = titelHeading + ': ' + this.get("order.title") + "\n";
		}

		if (this.get("order.orderNumber")) {
			var orderHeading = "Ordernummer";
			if (this.get("langForStandardAnswer") === "Engelska") {
				orderHeading = "Ordernumber";
			}
				
			ordernumberStr = orderHeading + ': ' + this.get("order.orderNumber") + "\n";
		}

		if (this.get("order.authors")) {
			var authorHeading = "Författare";
			if (this.get("langForStandardAnswer") === "Engelska") {
				authorHeading = "Author";
			}
				
			authorStr = authorHeading + ': ' + this.get("order.authors") + "\n";
		}
		if (this.get("order.journalTitle")) {
			var journalHeading = "Tidskriftstitel";
			if (this.get("langForStandardAnswer") === "Engelska") {
				journalHeading = "Journal title";
			}
			journalTitle = journalHeading + ': ' + this.get("order.journalTitle") + "\n";
		}

		this.set("bibInfo", "\n\n" + '------------------------- \n' + ordernumberStr + customerStr + title + authorStr +  journalTitle + '------------------------- \n');
	},

	observeAddBibInfo: function() {
		if (this.get("addBibInfo")) {
			this.generateBibInfo();
			var newStringToAdd = this.get("bibInfo");
			var oldStringToAddTo = "";
			if (this.get("emailmessage.body")) {
				oldStringToAddTo = this.get("emailmessage.body");
			}

			var newStringToPropagate = oldStringToAddTo + newStringToAdd;
			this.set("emailmessage.body", newStringToPropagate);
		}
		else {
			var unstrippedBody = this.get("emailmessage.body");
			var strippedBody = unstrippedBody.replace(this.get("bibInfo"), "");
			this.set("emailmessage.body", strippedBody);
		}
	}.observes('addBibInfo'),

	notesSorted: function() {
		// sort here
		var sorted = Ember.ArrayController.create({
			content: this.get("notes"),
			sortProperties: ['createdAt'],
			sortAscending: false
		});
		return sorted;
	}.property('notes.@each'),





	emailmessage: {

	},
	selectedAnswer: null,

	photocopiesIfLoanNotPossible: [
		{	
			value: true,
			label: "ja"
		},
		{	
			value: false,
			label: "nej"
		}
	],

	emailConfirmation: [
		{	
			value: true,
			label: "ja"
		},
		{	
			value: false,
			label: "nej"
		}
	],

	orderOutsideScandinavia: [
		{	
			value: true,
			label: "ja"
		},
		{	
			value: false,
			label: "nej"
		}
	],

	typeOfOrder: [
		{
			value: "1",
			label: "Kopia",
		},
		{
			value: "2",
			label: "Lån"
		}
	],

	init: function() {
		this.on("updateHistory", this.getCurrentHistory);

	},

	getCurrentHistory: function() {
		var id = this.get("order.id");
		this.set("history", this.store.find("note", {order_id: id}));
		var sorted = Ember.ArrayController.create({
			content: this.get("history"),
			sortProperties: ['createdAt'],
			sortAscending: false
		});
		this.set('history', sorted);
	},

	emailmessageChanged: function() {
		if (this.get("emailmessage.subject") === "") {
			this.trigger("disable-emailmessage-btn");
		}
		else {
			this.trigger("enable-emailmessage-btn");
		}
	}.observes('emailmessage.subject'),

	messageChanged: function() {
		if (this.get("message") === "") {
			this.trigger("disable-message-btn");	
		}
		else {
			this.trigger("enable-message-btn");	
		}
	}.observes("message"),

	updateEmailForm: function() {
		this.set("addBibInfo", false);
		if (this.get("langForStandardAnswer") === "Svenska") {
			this.set("emailmessage.subject", this.get("selectedAnswer.subjectSv"));
			this.set("emailmessage.body", this.get("selectedAnswer.bodySv"));
		}
		else {
			this.set("emailmessage.subject", this.get("selectedAnswer.subjectEn"));
			this.set("emailmessage.body", this.get("selectedAnswer.bodyEn"));
		}
		this.set("addBibInfo", true);

	}.observes('selectedAnswer'),

	turnOnLoading: function(id) {
		$("#" + id).addClass("loading");
	},


	turnOffLoading: function(id) {
		$("#" + id).removeClass("loading");
	},

	getPrintUrl: function() {
		return ENV.APP.serviceURL + "/orders/" + this.get("order.id") + ".pdf?token="+ this.get("session").get("token");
	}.property('order.id'),
	
	actions: {
		toggleLangForStandardAnswer: function() {
			if (this.get('langForStandardAnswer') === 'Engelska') {
				this.set("langForStandardAnswer", 'Svenska');
			}
			else {
				this.set("langForStandardAnswer", 'Engelska');
			}
			
		},


		toggleStickyNote: function(noteId) {
			if (this.get("stickyNoteForThisOrder") === noteId) {
				this.set("stickyNoteForThisOrder", null);
			}
			else {
				this.set("stickyNoteForThisOrder", noteId);
			}
		},

		/* ##### GLOBAL EDIT ##### */ 
		enterGlobalEditMode: function() {
			this.set("isEditingGlobalOrder", true);
		},
		resetGlobalMetaData: function() {
			this.get("order").rollback();
			this.set("isEditingGlobalOrder", false);
		},
		saveGlobalOrderMetaData: function() {
			var id = this.get("order.id");
			this.turnOnLoading(id);
			var self = this;
			var onSuccess = function() {
				self.turnOffLoading(id);
				//self.set("controllers.application.message", "Order " + self.get("model.orderNumber") + " har sparats.");
			}
			var onError = function() {
			}

			this.get("order").save().then(onSuccess, onError);

			this.set("isEditingGlobalOrder",false);
		},

		createNewMessage: function(orderId, email) {
			//var user = this.get("controllers.application.currentUser.id");
			var post = this.store.createRecord('note', {
			 		orderId: orderId, userId: this.get("session").get("userid"), message: this.get("message"), isEmail: email
			})




			var that = this;
			var onSuccess = function() {
				that.set("message", '');
				that.set("controllers.application.message", "Din anteckning har sparats");
				that.set('isNewNoteVisible',false);
				that.set('isNewMessageVisible',false);
				that.get("notes").pushObject(post);
			}
			var onError = function() {
				that.set("message", '');
				that.set("controllers.application.message", "Din anteckning har sparats");
			}
			post.save().then(onSuccess, onError);
		},
		createNewEmailMessage: function(orderId, email) {
			var post = this.store.createRecord('note', {
				orderId: orderId, userId: this.get("session").get("userid"), subject: this.get("emailmessage.subject"), message: this.get("emailmessage.body"), isEmail: email});
			var that = this;
			var onSuccess = function() {
				that.set("controllers.application.message", "Ditt mejl har sparats och kommer att skickas");
				that.set("selectedAnswer", null);
				that.set("emailmessage.subject", "");
				that.set("emailmessage.body", "");
				that.set('isNewNoteVisible',false);
				that.set('isNewMessageVisible',false);
				that.get("notes").pushObject(post);
			}
			var onError = function() {
				that.set("controllers.application.message", "Ditt mejl har sparats och kommer att skickas");
				that.set("selectedAnswer", null);
				that.set("emailmessage.subject", "");
				that.set("emailmessage.body", "");
			}
			post.save().then(onSuccess, onError);			
		},

		showCreateNewEmailMessage: function() {
			this.set('isNewMessageVisible',true);
		},
		hideCreateNewEmailMessage: function() {
			this.set('isNewMessageVisible',false);
		},

		showCreateNewNote: function() {
			this.set('isNewNoteVisible',true);
		},

		hideCreateNewNote: function() {
			this.set("isNewNoteVisible", false);
		},



 	}
});
