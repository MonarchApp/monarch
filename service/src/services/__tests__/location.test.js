const sinon = require('sinon');
const mockRequire = require('mock-require');

const location = require('../location.js');

const mockRp = {
  get: sinon.stub()
};

mockRequire('request-promise', mockRp);

describe.only('Location Service', function() {
  describe('geocode', function() {
    const hereAppId = 'Scrubbob';
    const hereAppCode = 'Octogonpants';
    const searchText = '(╯°□°）╯︵ ┻━┻';
    const label = 'SOMEWHERE!';
    const locationId = 'LOCATION';
    let result;

    context('when the call succeeds', function() {
      beforeEach(async function() {
        mockRp.get
          .withArgs({hereAppId, hereAppCode, search: searchText})
          .yields({label, locationId});

        result = await location.geocode({hereAppId, hereAppCode, search: searchText});
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
          .yields(requestFailure);
      });

      it('throws', function() {
        return expect(location.geocode({hereAppId, hereAppCode, search: searchText}))
          .to.eventually.be.rejectedWith(requestFailure);
      });
    });
  });
});
