const sinon = require('sinon');
const mock = require('mock-require');

const mockRp = {
  get: sinon.stub()
};

// mock('request-promise', mockRp);
const location = require('../location.js');

describe.skip('Location Service', function() {
  describe('search', function() {
    const hereAppId = 'Scrubbob';
    const hereAppCode = 'Octogonpants';
    const searchText = '(╯°□°）╯︵ ┻━┻';
    const label = 'SOMEWHERE!';
    const locationId = 'LOCATION';
    let result;

    after(function() {
      mock.stopAll();
    });

    context('when the call succeeds', function() {
      beforeEach(async function() {
        mockRp.get
          .withArgs({hereAppId, hereAppCode, search: searchText})
          .yields({searchions: {label, locationId}});

        result = await location.search({hereAppId, hereAppCode, search: searchText});
      });

      it('returns all available options', function() {
        expect(result).to.eql({label, locationId});
      });
    });

    context('when the call fails', function() {
      const requestFailure = new Error('WELL GODDAMNIT');

      beforeEach(async function() {
        mockRp.get
          .withArgs({hereAppId, hereAppCode, search: searchText})
          .rejects(requestFailure);
      });

      it('throws', function() {
        return expect(location.search({hereAppId, hereAppCode, search: searchText}))
          .to.eventually.be.rejectedWith(requestFailure);
      });
    });
  });
});
