import ActionTypes from 'constants/actions';
import IdentityReducer from '../identity';
import sinon from 'sinon';
import LocalStorageConstants from 'constants/local_storage';

const sandbox = sinon.createSandbox();

describe('IdentityReducer', function() {
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
    const initialState = {isAuthenticated: true};

    beforeEach(function() {
      returnValue = IdentityReducer(initialState, {type: ActionTypes.Identity.LOGIN_FAILURE});
    });

    it('revokes user authentication', function() {
      expect(returnValue.isAuthenticated).to.be.false;
    });

    it('clears the token in local storage', function() {
      expect(global.localStorage.removeItem).to.be
        .calledWith(LocalStorageConstants.TOKEN_KEY);
    });
  });

  context('when the user logins successfully', function() {
    const initialState = {isAuthenticated: false, token: ''};
    const token = 'token';

    beforeEach(function() {
      returnValue = IdentityReducer(initialState, {
        payload: {token},
        type: ActionTypes.Identity.LOGIN_SUCCESS
      });
    });

    it('authenticates the user', function() {
      expect(returnValue.isAuthenticated).to.be.true;
    });

    it('sets the token in local storage', function() {
      expect(global.localStorage.setItem).to.be
        .calledWith(LocalStorageConstants.TOKEN_KEY, token);
    });
  });
});
