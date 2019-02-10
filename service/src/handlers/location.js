const boom = require('boom');
const bounce = require('bounce');
const joi = require('joi');

const location = {
  search: {}
};

location.search.config = {
  validate: {
    payload: {
      value: joi.string().required()
    }
  }
};

location.search.handler = async (request, h) => {
  const {value} = request.payload;
  const {methods} = request.server;

  try {
    const searchResults = await methods.connect.location.search(value);

    return h.response(searchResults).code(200);
  } catch (error) {
    bounce.rethrow(error, 'system');

    request.log(
      ['error', 'connect', 'location', 'search'],
      `Failed to search for location: ${value}`
    );

    return boom.serverUnavailable();
  }
};

module.exports = location;
