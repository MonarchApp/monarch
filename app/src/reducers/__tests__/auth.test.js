import ActionTypes from 'constants/actions';
import AuthReducer from '../auth';
import Immutable from 'immutable';

describe('AuthReducer', function() {
  context('when the user fails to login', function() {
    const initialState = Immutable.Map({isAuthenticated: true});
    let returnValue;

    before(function() {
      returnValue = AuthReducer(initialState, {type: ActionTypes.Auth.LOGIN_FAILURE});
    });

    it('should set isAuthenticated to false', function() {
      expect(returnValue.get('isAuthenticated')).to.be.false;
    });
  });

  context('when the user logins successfully', function() {
    const initialState = Immutable.Map({isAuthenticated: false, token: ''});
    const token = 'token';
    let returnValue;

    before(function() {
      returnValue = AuthReducer(initialState, {
        payload: {token},
        type: ActionTypes.Auth.LOGIN_SUCCESS
      });
    });

    it('should set isAuthenticated to true', function() {
      expect(returnValue.get('isAuthenticated')).to.be.true;
    });

    it('should set the token', function() {
      expect(returnValue.get('token')).to.equal(token);
    });
  });
});
