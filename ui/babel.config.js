const plugins = [
  "@babel/plugin-transform-runtime"
];

const presets = [
  '@babel/preset-react',
  [
    '@babel/preset-env', {
      'targets': '> .5% or last 2 versions',
      'useBuiltIns': 'entry'
    }
  ]
];

module.exports = {plugins, presets};
