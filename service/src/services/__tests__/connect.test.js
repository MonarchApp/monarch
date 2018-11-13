const sinon = require('sinon');
const mockRequire = require('mock-require');

const connect = require('../connect.js');

const mockRp = {
  get: sinon.stub()
};

mockRequire('request-promise', mockRp);

describe.only('Connect Service', function() {
  describe('geocode', function() {
    const hereAppId = 'Scrubbob';
    const hereAppCode = 'Octogonpants';
    const searchText = ' (╯°□°）╯︵ ┻━┻';

    context('when calling the Here API', function() {
      beforeEach(function() {
        connect.reverseGeocode({hereAppId, hereAppCode, search: searchText});
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
