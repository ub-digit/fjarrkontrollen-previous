import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['application'],

	/* setup for filter params to server */
	filterToServer: {
		location: 1,
		status: 1,
		mediaType: [1,2],
		user: null,
		sortOrder: 1
	},
	
	
	sortOrder: 1,
	/* filter for interface */
	// loan
	loan: {
		active: true,
		disabled: false,
		name: 'Lån',
		id: 2
	},
	folder: [],

	copy: {
		active: true,
		disabled: false,
		name: 'Kopia',
		id: 1
	},
	currentLocation: 1,
	currentStatus: 1,


	updateDisabledStatusOnOrderType: function() {
		if (this.get('loan.active') && (this.get('copy.active'))) {
			this.set('loan.disabled', false);
			this.set('copy.disabled', false);
		}
		else if (!this.get('loan.active') && (this.get('copy.active'))) {
			this.set("copy.disabled", true);
			this.set("loan.disabled", false);
		}
		else if (!this.get("copy.active") && (this.get("loan.active"))) {
			this.set("loan.disabled", true);
			this.set("copy.disabled", false);
		}
	}.observes('loan.active', 'copy.active'),

	triggerFilter : function() {
	console.log(this.get("controllers.application.currentUser.id"));
		this.filterToServer.mediaType = [];
		if (this.get("loan.active")) {
			this.filterToServer.mediaType.push(this.get("loan.id"));
		}
		else {
			var index = this.filterToServer.mediaType.indexOf(this.get("loan.id"));
			this.filterToServer.mediaType.splice(index,1);
		}

		if (this.get("copy.active")) {
			this.filterToServer.mediaType.push(this.get("copy.id"));
		}

		if (this.currentLocation) {
			this.set("filterToServer.currentLocation",this.currentLocation);
		}
		if (this.currentStatus) {
			this.set("filterToServer.status", this.get('currentStatus'));
		}




		this.convertFilterVars();
		this.transitionToRoute("fjarr-in.index");
		console.log("currentLocation: " + this.filterToServer.currentLocation + " mediatypes: " + this.filterToServer.mediaType + " user: " + this.filterToServer.user + "status: " + this.filterToServer.status + " sortOrder: " + this.sortOrder);
	}.observes('folder.@each.active','loan.active', 'currentLocation', 'copy.active', 'currentStatus', 'sortOrder'),
	

	convertFilterVars: function() {
		// convert a zero of status id to null for server to not trigger any filter on this
		if (this.get("filterToServer.status") === "0") {
			this.set("filterToServer.status", null);
		}
	},


	turnOnLoading: function(id) {
		Ember.$("#" + id).addClass("loading");
	},

	turnOffLoading: function(id) {
		Ember.$("#" + id).removeClass("loading");
	},

	actions: {

		removeOwner: function(orderNumber) {
			this.turnOnLoading(orderNumber);
			var self = this;
			this.store.find("order", orderNumber).then(function(item) {
				item.set("userId", null);
				var onError = function(error) {
					console.log(error);
				};
				var onSuccess = function() {
					self.transitionToRoute("fjarr-in.list");
					//self.set("controllers.application.message", "Handläggaren har tagits bort från ordern med nummer " + orderNumber);
					self.turnOffLoading(orderNumber);
				};

				item.save().then(onSuccess, onError);

			});
		},


		switchOwner: function(orderNumber, newUserId) {
			this.turnOnLoading(orderNumber);
			var self = this;
			this.store.find("order", orderNumber).then(function(item) {
				item.set("userId", newUserId);

				var onError = function(error) {
					console.log(error);
				};
				var onSuccess = function(item) {
					self.turnOffLoading(orderNumber);
			//		self.set("controllers.application.message", "Ordern med nummer " + orderNumber + " har bytt Handläggare till " + userId);
					self.transitionToRoute("fjarr-in.list");
				};
				item.save().then(onSuccess, onError);
			});
		},
		setFolder: function(id) {
			this.folder.forEach(function(item, index) {
				item.set("active",false)
			});

			var clickedFolder = this.folder.find(function(item, index) {
				if (item.id === id) {
					return item;
				}
			});
			this.filterToServer.user = clickedFolder.get("user");
			clickedFolder.set("active", true);


		},
	}



});
