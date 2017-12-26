import ActionTypes from 'constants/actions';
import UiReducer from '../ui';
import Immutable from 'immutable';

describe('UiReducer', function() {
  const getContainerValue = (container, key) => returnValue.getIn(['ui', container, key]);
  let returnValue;

  context('when the user attempts to login', function() {
    const initialState = Immutable.Map({isLoading: false});

    before(function() {
      returnValue = UiReducer(initialState, {type: ActionTypes.Auth.LOGIN_REQUEST});
    });

    it('sets isLoading to on the login container to true', function() {
      expect(getContainerValue('login', 'isLoading')).to.be.true;
    });
  });

  context('when the user fails to login', function() {
    const initialState = Immutable.Map({isLoading: true});

    before(function() {
      returnValue = UiReducer(initialState, {type: ActionTypes.Auth.LOGIN_FAILURE});
    });

    it('sets isLoading to on the login container to false', function() {
      expect(getContainerValue('login', 'isLoading')).to.be.false;
    });
  });

  context('when the user logins successfully', function() {
    const initialState = Immutable.Map({isLoading: true});

    before(function() {
      returnValue = UiReducer(initialState, {type: ActionTypes.Auth.LOGIN_SUCCESS});
    });

    it('sets isLoading to on the login container to false', function() {
      expect(getContainerValue('login', 'isLoading')).to.be.false;
    });
  });
});
