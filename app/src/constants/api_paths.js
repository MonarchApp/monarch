import Config from 'config';

const URL_PREFIX = `${Config.API_URL}/${Config.API_VERSION}`;

export default {
  LOGIN: `${URL_PREFIX}/login`
};
