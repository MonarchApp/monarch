import ActionTypes from 'constants/actions';
import _ from 'lodash';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';

import apiInjector from 'inject-loader!../api';
const normalizeStub = sinon.stub();
const ApiMiddleware = apiInjector({normalizr: {normalize: normalizeStub}});


describe('API Middleware', function() {
  const endpoint = "It's a big hat. It's funny.";
  const failureType = 'Celebrity Jeopardy';
  const options = 'Turd Ferguson';
  const requestType = 'The only month that starts with Feb';
  const schema = 'Suck it, Trebek!';
  const successType = 'Febtober!';
  let fetchStub;

  const action = {
    type: ActionTypes.Api.CALL,
    payload: {
      endpoint,
      options,
      types: [requestType, successType, failureType]
    }
  };

  const actionWithSchema = _.merge({}, action, {payload: {schema}});
  const store = configureStore([ApiMiddleware.default])({});

  before(function() {
    fetchStub = sinon.stub(global, 'fetch');
  });

  afterEach(function() {
    fetchStub.resetHistory();
    store.clearActions();
  });

  context('when the action is not an API call', function() {
    const otherAction = {type: 'Swords for 200'};
    let firstDispatchedAction;

    beforeEach(async function() {
      await store.dispatch(otherAction);
      [firstDispatchedAction] = store.getActions();
    });

    it('dispatches the action unchanged', function() {
      expect(firstDispatchedAction).to.eql(otherAction);
    });

    it('does not dispatch any other action', function() {
      expect(store.getActions()).to.have.lengthOf(1);
    });
  });

  context('when the action is an API call', function() {
    context('when making the request', function() {
      let firstDispatchedAction;

      beforeEach(async function() {
        await store.dispatch(action);
        [firstDispatchedAction] = store.getActions();
      });

      it('dispatches an action using the provided request type', function() {
        expect(firstDispatchedAction).to.eql(Object.assign({}, action, {type: requestType}));
      });

      it('makes the request with the correct parameters', function() {
        expect(fetchStub).to.be.calledWith(endpoint, options);
      });
    });

    context('when the request fails', function() {
      const mockError = () => 'I know your mother, Trebek!';
      const failedResponse = {error: mockError, ok: false};
      let resultAction;

      beforeEach(async function() {
        fetchStub.resolves(failedResponse);
        await store.dispatch(action);
        [, resultAction] = store.getActions();
      });

      it('dispatches an action with the error and provided failure type', function() {
        expect(resultAction).to.eql({error: true, payload: mockError(), type: failureType});
      });
    });

    context('when the request succeeds', function() {
      const formattedResponse = {body: 'Yes, Burt Reynolds?'};
      const response = {body: "Yeah, I'll take the, uh, condom thing for, uh, 8,000"};
      const json = () => Promise.resolve(response);
      const successResponse = {ok: true, json};
      let resultAction;

      before(function() {
        fetchStub.resolves(successResponse);
      });

      context('and a schema is provided', function() {
        beforeEach(async function() {
          normalizeStub.withArgs(response, schema).returns(formattedResponse);
          await store.dispatch(actionWithSchema);
          [, resultAction] = store.getActions();
        });

        it('applies the schema to the return json', function() {
          expect(normalizeStub).to.be.calledWith(response, schema);
        });

        it('dispatches an action with the normalized payload and the provided success type',
          function() {
            expect(resultAction).to.eql({payload: formattedResponse, type: successType});
          });
      });

      context('and a schema is not provided', function() {
        beforeEach(async function() {
          await store.dispatch(action);
          [, resultAction] = store.getActions();
        });

        it('dispatches an action with the raw payload and the provided success type', function() {
          expect(resultAction).to.eql({payload: response, type: successType});
        });
      });
    });
  });
});
