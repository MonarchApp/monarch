const sinon = require('sinon');
const mock = require('mock-require');

const mockRp = {
  get: sinon.stub()
};

mock('request-promise', mockRp);
const location = require('../location.js');

describe('Location Service', function() {
  describe('search', function() {
    const locationGatewayId = 'Scrubbob';
    const locationGatewayCode = 'Octogonpants';
    const locationGatewayHost = 'https://speedo-bottom.com';
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

    context('when constructing the uri', function() {
      beforeEach(function() {
        mockRp
          .get
          .resolves({suggestions: [{label: 'butt', locationId: 'stuff'}]});
      });

      context('and a port is passed', function() {
        const port = '666';

        beforeEach(async function() {
          await location.search({
            locationGatewayHost,
            locationGatewayId,
            locationGatewayCode,
            port,
            search: searchText
          });
        });

        it('adds the port to the uri', function() {
          expect(mockRp.get).to.be.calledWithMatch({
            uri: `${locationGatewayHost}:${port}/6.2/suggest.json`
          });
        });
      });

      context('and no port is passed', function() {
        beforeEach(async function() {
          await location.search({
            locationGatewayHost,
            locationGatewayId,
            locationGatewayCode,
            search: searchText
          });
        });

        it("doesn't add the port to the uri", function() {
          expect(mockRp.get).to.be.calledWithMatch({
            uri: `${locationGatewayHost}/6.2/suggest.json`
          });
        });
      });
    });

    context('when the call succeeds', function() {
      beforeEach(async function() {
        mockRp.get
          .withArgs({
            json: true,
            qs: {
              app_code: locationGatewayCode,
              app_id: locationGatewayId,
              query: searchText
            },
            uri: `${locationGatewayHost}/6.2/suggest.json`
          })
          .resolves({suggestions: [{label, locationId}]});

        returnValue = await location
          .search({
            locationGatewayHost,
            locationGatewayId,
            locationGatewayCode,
            search: searchText
          });
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
        return expect(location.search({
          locationGatewayHost,
          locationGatewayId,
          locationGatewayCode,
          search: searchText
        })).to.be.rejectedWith(requestFailure);
      });
    });
  });
});
