const sinon = require('sinon');
const mock = require('mock-require');

const mockRp = {
  get: sinon.stub()
};

mock('request-promise', mockRp);
const location = require('../location.js');

describe.only('Location Service', function() {
  describe('search', function() {
    const hereAppId = 'Scrubbob';
    const hereAppCode = 'Octogonpants';
    const searchText = '(╯°□°）╯︵ ┻━┻';
    const label = 'SOMEWHERE!';
    const locationId = 'LOCATION';
    let returnValue;

    after(function() {
      mock.stopAll();
    });

    afterEach(function() {
      mockRp.get.reset();
    });

    context('when the call succeeds', function() {
      beforeEach(async function() {
        mockRp.get
          .withArgs({
            json: true,
            qs: {
              app_code: hereAppCode,
              app_id: hereAppId,
              query: searchText
            },
            uri: 'https://autocomplete.geocoder.api.here.com/6.2/suggest.json'
          })
          .resolves({suggestions: [{label, locationId}]});

        returnValue = await location.search({hereAppId, hereAppCode, search: searchText});
      });

      it('returns all available options', function() {
        expect(returnValue).to.eql([{label, locationId}]);
      });
    });

    context('when the call fails', function() {
      const requestFailure = new Error('WELL GODDAMNIT');

      beforeEach(async function() {
        mockRp.get.rejects(requestFailure);
      });

      it('throws', function() {
        return expect(location.search({hereAppId, hereAppCode, search: searchText}))
          .to.be.rejectedWith(requestFailure);
      });
    });
  });
});
