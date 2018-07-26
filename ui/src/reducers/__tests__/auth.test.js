import ActionTypes from 'constants/actions';
import AuthReducer from '../auth';
import Immutable from 'immutable';
import sinon from 'sinon';
import LocalStorageConstants from 'constants/local_storage';

const sandbox = sinon.createSandbox();

describe('AuthReducer', function() {
  let returnValue;

  before(function() {
    global.localStorage = {
      removeItem: sandbox.spy(),
      setItem: sandbox.spy()
    };
  });

  afterEach(function() {
    sandbox.resetHistory();
  });

  context('when the user fails to login', function() {
    const initialState = Immutable.Map({isAuthenticated: true});

    beforeEach(function() {
      returnValue = AuthReducer(initialState, {type: ActionTypes.Auth.LOGIN_FAILURE});
    });

    it('sets isAuthenticated to false', function() {
      expect(returnValue.get('isAuthenticated')).to.be.false;
    });

    it('clears the token in local storage', function() {
      expect(global.localStorage.removeItem).to.be
        .calledWith(LocalStorageConstants.TOKEN_KEY);
    });
  });

  context('when the user logins successfully', function() {
    const initialState = Immutable.Map({isAuthenticated: false, token: ''});
    const token = 'token';

    beforeEach(function() {
      returnValue = AuthReducer(initialState, {
        payload: {token},
        type: ActionTypes.Auth.LOGIN_SUCCESS
      });
    });

    it('sets isAuthenticated to true', function() {
      expect(returnValue.get('isAuthenticated')).to.be.true;
    });

    it('sets the token in local storage', function() {
      expect(global.localStorage.setItem).to.be
        .calledWith(LocalStorageConstants.TOKEN_KEY, token);
    });
  });
});
