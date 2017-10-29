import Sinon from 'sinon';
import {mockDispatch} from './../test_utilities';

describe('Test Utilities', function() {
  describe('mockDispatch', function() {
    let actionToDispatch;
    let action;
    let returnValue;
    const argOne = 'I prefer kick drums,';
    const argTwo = 'and red wine.';

    beforeEach(async function() {
      actionToDispatch = Sinon.spy(() => Promise.resolve());
      action = Sinon.spy(() => actionToDispatch);

      returnValue = await mockDispatch(action, argOne, argTwo);
    });

    it('should call the action with the provided arguments', function() {
      expect(action).to.be.calledWith(argOne, argTwo);
    });

    it('should call the promise returned by the action with dispatch', function() {
      expect(actionToDispatch).to.be.calledWith(Sinon.match.func);
    });

    it('should return the spy', function() {
      expect(returnValue).to.eql(actionToDispatch.firstCall.args[0]);
    });
  });
});
