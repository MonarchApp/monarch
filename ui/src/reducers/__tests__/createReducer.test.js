import createReducer from '../createReducer';
import sinon from 'sinon';

const sandbox = sinon.createSandbox();
const EXAMPLE_ACTION = {type: "EXAMPLE_ACTION_NAME", payload: 123}; 
const INITIAL_STATE = {example1: 'test1', example2: 'test2'};
const FINAL_STATE = {example1: 'modified1', example2: 'modified2'};

describe('createReducer', function() {
  let reducer;
  beforeEach(function() {
    const handlers = {
     [EXAMPLE_ACTION.type]: sandbox.stub().returns(FINAL_STATE)
    }
    reducer = createReducer(INITIAL_STATE, handlers);
  });

  afterEach(function() {
    sandbox.resetHistory();
  });

  context('when a defined action is called', function() {
    it('it should invoke the provided handler', function() {
      expect(reducer(INITIAL_STATE, EXAMPLE_ACTION)).to.eq(FINAL_STATE);
    });
  });

  context('when an udefined action is called', function() {
    const UNDEFINED_ACTION = {type: "UNDEFINED_ACTION", payload: 456}; 
    it('it should not modify the state', function() {
      expect(reducer(INITIAL_STATE, UNDEFINED_ACTION)).to.eq(INITIAL_STATE);
    });
  });
});
