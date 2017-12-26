import ActionTypes from 'constants/actions';
import AuthReducer from '../auth';
import Immutable from 'immutable';

describe('AuthReducer', function() {
  let returnValue;

  context('when the user fails to login', function() {
    const initialState = Immutable.Map({isAuthenticated: true});

    before(function() {
      returnValue = AuthReducer(initialState, {type: ActionTypes.Auth.LOGIN_FAILURE});
    });

    it('sets isAuthenticated to false', function() {
      expect(returnValue.get('isAuthenticated')).to.be.false;
    });

    it('clears the token', function() {
      expect(returnValue.get('token')).to.be.null;
    });
  });

  context('when the user logins successfully', function() {
    const initialState = Immutable.Map({isAuthenticated: false, token: ''});
    const token = 'token';

    before(function() {
      returnValue = AuthReducer(initialState, {
        payload: {token},
        type: ActionTypes.Auth.LOGIN_SUCCESS
      });
    });

    it('sets isAuthenticated to true', function() {
      expect(returnValue.get('isAuthenticated')).to.be.true;
    });

    it('sets the token', function() {
      expect(returnValue.get('token')).to.equal(token);
    });
  });
});
