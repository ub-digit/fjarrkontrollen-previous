import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
	needs: ['application'],
    authenticator: 'authenticator:custom',
	queryParams: ['query'],
    query: '',

    actions: {
    	search: function() {
    		// trigger search
    		this.transitionToRoute("search",  {queryParams: {query: this.get("query")}});
    	},
    	clearSearch: function() {
    		this.set("query", '');
    	}
    }
});