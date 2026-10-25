const { NextFederationPlugin } = require('@module-federation/nextjs-mf');

// Endereço base de cada remote (no GitHub Pages vem das variáveis de ambiente do CI)
const CARDAPIO_URL = process.env.CARDAPIO_URL || 'http://localhost:3001';
const PEDIDO_URL = process.env.PEDIDO_URL || 'http://localhost:3002';

// Endereço dos remotes. O Next gera um remoteEntry para o servidor (ssr) e outro para o navegador (chunks).
function remotes(isServer) {
  const pasta = isServer ? 'ssr' : 'chunks';
  return {
    cardapio: `cardapio@${CARDAPIO_URL}/_next/static/${pasta}/remoteEntry.js`,
    pedido: `pedido@${PEDIDO_URL}/_next/static/${pasta}/remoteEntry.js`,
  };
}

// No GitHub Pages o app é exportado como site estático dentro de uma subpasta (ex.: /repo)
const basePath = process.env.BASE_PATH || '';

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  ...(process.env.STATIC_EXPORT && { output: 'export', basePath }),
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
