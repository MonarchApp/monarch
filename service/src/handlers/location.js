const boom = require('boom');
const bounce = require('bounce');
const joi = require('joi');

const locationService = require('../services/location');

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
  const {code, id, port} = request.config.get('hereApi');

  try {
    const searchResults = await locationService.search({
      hereAppCode: code,
      hereAppId: id,
      port,
      search: value
    });

    return h.response(searchResults).code(200);
  } catch (error) {
    bounce.rethrow(error, 'system');
    return boom.serverUnavailable();
  }
};

module.exports = location;
