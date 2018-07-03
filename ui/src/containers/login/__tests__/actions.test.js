import ActionTypes from 'constants/actions';
import ApiPaths from 'constants/api_paths';
import Auth from '../actions';
import configureStore from 'redux-mock-store';

describe('Auth Actions', function() {
  const store = configureStore([])({});

  afterEach(function() {
    store.clearActions();
  });

  describe('login', function() {
    const email = 'Randy Savage';
    const password = 'SNAP INTO A SLIM JIM!';
    const {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS} = ActionTypes.Auth;

    before(function() {
      store.dispatch(Auth.login(email, password));
    });

    it('should dispatch the proper action', function() {
      expect(store.getActions()).to.eql([{
        type: ActionTypes.Api.CALL,
        payload: {
          endpoint: ApiPaths.LOGIN,
          options: {body: {email, password}, method: 'POST'},
          types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE]
        },
      }]);
    });
  });
});
