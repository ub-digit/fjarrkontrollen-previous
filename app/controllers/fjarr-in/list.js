import Ember from 'ember';

export default Ember.Controller.extend({
	needs: ['application'],
	firstLoad: true, 
	showOk: true, 

	zeroOrdersFound: function() {
		if (this.get("model.length") === 0) {
			return true;
		}
	}.property('model.@each'),

	/* setup for filter params to server */
	filterToServer: {
		search_term: '',
		currentLocation: 1,
		status: 1,
		mediaType: [1,2],
		user: null,
		sortfield: 'order_number',
		sortdir: 'DESC',
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

	user: {
		active:false,
	},

	query: '', 


	currentStatusChanged: function() {
		if (dataLayer) {
			dataLayer.push({'event': 'filterType', 'eventLabel':this.get("currentStatus")});
		}

	}.observes('currentStatus'),

	sortCols: {
		ordernumber: Ember.Object.create({id:1, sortfield: "order_number", active: true, sortDir: 'DESC'}),
		customer: Ember.Object.create({id:2, sortfield: "name", active: false, sortDir: 'ASC'}),
		type: Ember.Object.create({id:3,sortfield: 'order_type_id' ,active: false, sortDir: 'ASC'}),
		title: Ember.Object.create({id:4, sortfield: 'title', active: false, sortDir: 'ASC'}),
		status: Ember.Object.create({id:5, active: false, sortfield: 'status_id', sortDir: 'ASC'})
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

		if (this.get("query")) {
			this.set("filterToServer.search_term", this.get("query"));
		}
		else {
			this.set("filterToServer.search_term", '');
		}

		if (this.get("user.active") === true) {
			if (this.get("session.userid")) {
				this.set("filterToServer.user", this.get("session.userid"));
			}	
		}
		else {
			this.set("filterToServer.user", null);
		}
		this.convertFilterVars();

		this.transitionToRoute("fjarr-in.index");
		console.log("search_term: " + this.filterToServer.search_term + " currentLocation: " + this.filterToServer.currentLocation + " mediatypes: " + this.filterToServer.mediaType + " user: " + this.filterToServer.user + "status: " + this.filterToServer.status + " sortOrder: " + this.sortOrder);
	}.observes('sortCols.@each.active', 'sortCols.@each.sortDir', 'folder.@each.active','user.active','query','loan.active', 'currentLocation', 'copy.active', 'currentStatus', 'sortOrder'),
	

	convertFilterVars: function() {
		// convert a zero of status id to null for server to not trigger any filter on this
		if (this.get("filterToServer.status") === "0") {
			this.set("filterToServer.status", null);
		}

		if (this.get("filterToServer.currentLocation") === 0) {
			this.set("filterToServer.currentLocation", null);
		}
	},


	turnOnLoading: function(id) {
		Ember.$("#" + id).addClass("loading");
	},

	turnOffLoading: function(id) {
		Ember.$("#" + id).removeClass("loading");
	},

	actions: {
		clearSearch: function() {
			this.set("query", '');
		},
		removeOwner: function(orderNumber) {
			this.turnOnLoading(orderNumber);
			var self = this;
			this.store.find("order", orderNumber).then(function(item) {
				item.set("userId", null);
				var onError = function(error) {
					console.log(error);
				};
				var onSuccess = function() {
					self.triggerFilter();
				//	self.transitionToRoute("fjarr-in.list");
					//self.set("controllers.application.message", "Handläggaren har tagits bort från ordern med nummer " + orderNumber);
					self.turnOffLoading(orderNumber);
				};

				item.save().then(onSuccess, onError);
			  // code here will execute within a RunLoop in about 500ms with this == myContext
				

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
					self.triggerFilter();
			//		self.set("controllers.application.message", "Ordern med nummer " + orderNumber + " har bytt Handläggare till " + userId);
					//self.transitionToRoute("fjarr-in.list");
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
