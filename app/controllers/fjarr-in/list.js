import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['application'],

	/* setup for filter params to server */
	filterToServer: {
		currentLocation: 1,
		status: 1,
		mediaType: [1,2],
		user: null,
		sortfield: 'title',
		sortdir: 'ASC',
	},
	
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

	sortCols: {
		ordernumber: Ember.Object.create({id:1, sortfield: "order_number", active: true, sortDir: 'ASC'}),
		customer: Ember.Object.create({id:2, sortfield: "name", active: false, sortDir: 'ASC'}),
		type: Ember.Object.create({id:3,sortfield: 'order_type_id' ,active: false, sortDir: 'ASC'}),
		title: Ember.Object.create({id:3, sortfield: 'title', active: false, sortDir: 'ASC'}),
		status: Ember.Object.create({id:3, active: false, sortfield: 'status_id', sortDir: 'ASC'})
	},


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
		
		if (this.currentStatus === '0') {
			this.set("filterToServer.status", "");
		}
		else {
			this.set("filterToServer.status", this.get('currentStatus'));
		}





		this.convertFilterVars();
		this.transitionToRoute("fjarr-in.index");
		console.log("currentLocation: " + this.filterToServer.currentLocation + " mediatypes: " + this.filterToServer.mediaType + " user: " + this.filterToServer.user + "status: " + this.filterToServer.status + " sortOrder: " + this.sortOrder);
	}.observes('sortCols.@each.active', 'sortCols.@each.sortDir', 'folder.@each.active','loan.active', 'currentLocation', 'copy.active', 'currentStatus', 'sortOrder'),
	

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

		sortMe: function(sortObject) {
			if (sortObject.active) {
				if (sortObject.sortDir === 'ASC') {
					sortObject.set('sortDir', 'DESC');
					this.set('filterToServer.sortdir', 'DESC');
				}
				else {
					sortObject.set("sortDir", 'ASC');
					this.set('filterToServer.sortdir', 'ASC');
				}
			}
			else {
				// reset all 
				this.set("sortCols.ordernumber.active", false);
				this.set("sortCols.customer.active", false);
				this.set("sortCols.type.active", false);
				this.set("sortCols.title.active", false);
				this.set("sortCols.status.active", false);

				sortObject.set("active", true);
				this.set('filterToServer.sortfield', sortObject.get("sortfield"));
				sortObject.set("sortDir", 'ASC');
				this.set('filterToServer.sortdir', 'ASC');
			}

			this.triggerFilter();
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
				item.set("active",false);
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
