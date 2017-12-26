import DevelopConfig from './develop.json';

const getConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'development':
      return DevelopConfig;
    default:
      return DevelopConfig;
  }
};

export default getConfig();
