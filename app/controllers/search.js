import Ember from 'ember';
import LoginControllerMixin from 'simple-auth/mixins/login-controller-mixin';

export default Ember.Controller.extend(LoginControllerMixin, {
    authenticator: 'authenticator:custom',

    actions: {
    	search: function() {
    		alert("search mot server");
    	}
    }
});