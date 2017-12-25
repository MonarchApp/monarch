import ActionTypes from 'constants/actions';
import ApiMiddleware from '../api';
import Sinon from 'sinon';
import 'whatwg-fetch';

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

  const actionWithSchema = Object.assign({}, action, {payload: {schema}});

  const nextSpy = Sinon.spy();
  const dispatchWithApi = ApiMiddleware()(nextSpy);

  beforeEach(function() {
    fetchStub = Sinon.stub(global, 'fetch');
  });

  afterEach(function() {
    fetchStub.resetHistory();
    nextSpy.reset();
  });

  context('when the action is not an API call', function() {
    const otherAction = {type: 'Swords for 200'};

    beforeEach(async function() {
      await dispatchWithApi(otherAction);
    });

    it('passes the original action to the next middleware', function() {
      expect(nextSpy).to.be.calledWith(otherAction);
    });
  });

  context('when the action is an API call', function() {
    context('when making the request', function() {
      beforeEach(async function() {
        await dispatchWithApi(action);
      });

      it('passes an action with the provided request type to the next middleware', function() {
        expect(nextSpy).to.be.calledWith(Object.assign({}, action, {type: requestType}));
      });

      it('calls fetch with the correct parameters', function() {
        expect(fetchStub).to.be.calledWith(endpoint, options);
      });
    });

    context('when the request fails', function() {
      const mockError = new Error('I know your mother, Trebek!');
      const failedResponse = {error: mockError, ok: false};

      beforeEach(async function() {
        fetchStub.resolves(failedResponse);
        await dispatchWithApi(action);
      });

      it('passes an action with the error and provided failure type to the next middleware',
        function() {
          expect(nextSpy).to.be.calledWith({error: true, payload: mockError, type: failureType});
        });
    });

    context('when the request succeeds', function() {
      const formattedResponse = {body: 'Yes, Burt Reynolds?'};
      const response = {body: "Yeah, I'll take the, uh, condom thing for, uh, 8,000"};
      const json = () => Promise.resolve({response});
      const successResponse = {ok: true, json};

      beforeEach(function() {
        fetchStub.resolves(successResponse);
      });

      // TODO - Figure out how to stub normalize
      context.skip('and a schema is provided', function() {
        const normalizeStub = Sinon.stub();

        beforeEach(async function() {
          normalizeStub.withArgs(response, schema).returns(formattedResponse);
          await dispatchWithApi(actionWithSchema);
        });

        it('applies the schema to the return json', function() {
          expect(normalizeStub).to.be.calledWith(response, schema);
        });

        it(`passes an action with the formatted payload and the provided success type
            to the next middleware`, function() {
            expect(nextSpy).to.be.calledWith({payload: formattedResponse, type: successType});
          });
      });

      context('and a schema is not provided', function() {
        beforeEach(async function() {
          await dispatchWithApi(action);
        });

        it(`passes an action with the raw payload and the provided success type
            to the next middleware`, function() {
            expect(nextSpy).to.be.calledWith({payload: response, type: successType});
          });
      });
    });
  });
});
