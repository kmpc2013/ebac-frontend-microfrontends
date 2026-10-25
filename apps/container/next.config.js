const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

// Endereço dos remotes. O Next gera um remoteEntry para o servidor (ssr) e outro para o navegador (chunks).
function remotes(isServer) {
  const pasta = isServer ? 'ssr' : 'chunks';
  return {
    cardapio: `cardapio@http://localhost:3001/_next/static/${pasta}/remoteEntry.js`,
    pedido: `pedido@http://localhost:3002/_next/static/${pasta}/remoteEntry.js`,
  };
}

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack(config, options) {
    config.plugins.push(
      new NextFederationPlugin({
        name: 'container',
        filename: 'static/chunks/remoteEntry.js',
        remotes: remotes(options.isServer),
        shared: {},
        extraOptions: { exposePages: false },
      })
    );
    return config;
  },
};
