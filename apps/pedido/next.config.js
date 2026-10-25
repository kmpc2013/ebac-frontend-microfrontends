const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

// No GitHub Pages o app é exportado como site estático dentro de uma subpasta (ex.: /repo/cardapio)
const basePath = process.env.BASE_PATH || '';

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  ...(process.env.STATIC_EXPORT && { output: 'export', basePath }),
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
