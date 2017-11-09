import Api from 'middleware/api';
import ApiPaths from 'constants/api_paths';
import AuthActions from 'actions/auth';
import Sinon from 'sinon';
import 'whatwg-fetch';
import {mockDispatch} from 'utils/test_utilities';

describe('API Middleware', function() {
  let dispatchSpy;

  beforeEach(function() {
    Sinon.stub(window, 'fetch');
  });

  describe('login', function() {
    const errorMessage = 'Swords for 400';
    const password = 'Andre the giant for...1000 dollars';
    const token = "Yeah, it's a funny hat";
    const user = 'Turd Ferguson';

    context('when making the request', function() {
      beforeEach(async function() {
        dispatchSpy = await mockDispatch(Api.login, user, password);
      });

      it('dispatches the login request action', function() {
        expect(dispatchSpy).to.be.calledWith(AuthActions.loginRequest);
      });

      it('calls fetch with the right parameters', function() {
        expect(window.fetch).to.be.calledWith(ApiPaths.LOGIN, {
          body: {user, password},
          method: 'POST'
        });
      });
    });

    context('when the request fails', function() {
      beforeEach(async function() {
        const failedResponse = {error: () => errorMessage};
        window.fetch.resolves(failedResponse);

        dispatchSpy = await mockDispatch(Api.login, user, password);
      });

      it('dispatches the login fail action with the error message', function() {
        expect(dispatchSpy).to.be.calledWith(AuthActions.loginFailure, errorMessage);
      });
    });

    context('when the request succeeds', function() {
      beforeEach(async function() {
        const successResponse = {json: () => Promise.resolve({token})};
        window.fetch.resolves(successResponse);

        dispatchSpy = await mockDispatch(Api.login, user, password);
      });

      it('dispatches the login success action with the request token', function() {
        expect(dispatchSpy).to.be.calledWith(AuthActions.loginSuccess, token);
      });
    });
  });
});
