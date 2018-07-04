const mock = require('mock-require');
const sinon = require('sinon');

const sandbox = sinon.createSandbox();
const mockRequestUtils = {getTokenFromRequest: sandbox.stub()};
const mockBoom = {forbidden: sandbox.stub()};

mock('../request', mockRequestUtils);
mock('boom', mockBoom);
const userUtils = require('../user');

describe('userUtils', function() {
  after(function() {
    mock.stopAll();
  });

  afterEach(function() {
    sandbox.reset();
  });

  describe('enforceSelfActionOnly', function() {
    const mockRequest = {params: {id: 0}};
    const mockReply = sandbox.spy();
    mockReply.continue = sandbox.spy();

    context('when the authenticated user id matches the id parameter value', function() {
      before(function() {
        mockRequestUtils.getTokenFromRequest
          .withArgs(mockRequest)
          .returns({id: 0});

        userUtils.enforceSelfActionOnly(mockRequest, mockReply);
      });

      it('continues the response', function() {
        expect(mockReply.continue).to.be.called;
      });

      it('does not reply', function() {
        expect(mockReply).to.not.be.called;
      });
    });

    context('when the authenticated user id does not match the id parameter value', function() {
      const forbiddenError = "Ah ah ah! You didn't say the magic word!";

      before(function() {
        mockRequestUtils.getTokenFromRequest
          .withArgs(mockRequest)
          .returns({id: 1});

        mockBoom.forbidden
          .withArgs('This action may only be performed by the same user')
          .returns(forbiddenError);

        userUtils.enforceSelfActionOnly(mockRequest, mockReply);
      });

      it('responds with forbidden', function() {
        expect(mockReply).to.be.calledWith(forbiddenError);
      });

      it('does not continue', function() {
        expect(mockReply.continue).to.not.be.called;
      });
    });
  });
});
