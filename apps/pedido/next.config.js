const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'pedido', // nome do remote: o container importa "pedido/..."
        filename: 'static/chunks/remoteEntry.js',
        exposes: {
          './Pedido': './components/Pedido.jsx',
        },
        shared: {},
        extraOptions: { exposePages: false },
      })
    );
    return config;
  },
};
