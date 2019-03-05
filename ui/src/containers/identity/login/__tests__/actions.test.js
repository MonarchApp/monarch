import ActionTypes from 'constants/actions';
import ApiPaths from 'constants/api_paths';
import Identity from '../actions';
import configureStore from 'redux-mock-store';

describe('Identity Actions', function() {
  const store = configureStore([])({});

  afterEach(function() {
    store.clearActions();
  });

  describe('login', function() {
    const email = 'Randy Savage';
    const password = 'SNAP INTO A SLIM JIM!';
    const { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } = ActionTypes.Identity;

    before(function() {
      store.dispatch(Identity.login(email, password));
    });

    it('should dispatch the proper action', function() {
      expect(store.getActions()).to.eql([{
        type: ActionTypes.Api.CALL,
        payload: {
          endpoint: ApiPaths.LOGIN,
          options: { body: { email, password }, method: 'POST' },
          types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE]
        },
      }]);
    });
  });
});
