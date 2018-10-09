const sinon = require('sinon');
const mockRequire = require('mock-require');

const here = require('../here.js');

const mockRp = {
  get: sinon.stub()
};

mockRequire('request-promise', mockRp);

describe.skip('Location Service', function() {
  describe('geocode', function() {
    const hereAppId = 'Scrubbob Octogonpants';
    const hereAppCode = 'Mattress Bar';
    const searchText = ' (╯°□°）╯︵ ┻━┻';

    context('when calling the Here API', function() {
      beforeEach(function() {
        here.reverseGeocode({hereAppId, hereAppCode, search: searchText});
      });

      it('calls the API with the provided search query', async function() {
        return expect(mockRp.get).to.be.calledWith({
          uri: sinon.match.string,
          qs: {
            app_id: hereAppId,
            app_code: hereAppCode,
            searchText
          }
        });
      });
    });

    context('when the call succeeds', function() {
      it('returns the formatted coordinates', function() {});
    });

    context('when the call fails', function() {
      it('throws', function() {});
    });
  });
});
