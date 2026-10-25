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
        name: 'cardapio', // nome do remote: o container importa "cardapio/..."
        filename: 'static/chunks/remoteEntry.js', // arquivo de entrada publicado por este micro
        exposes: {
          './Cardapio': './components/Cardapio.jsx', // o que outros apps podem importar
        },
        shared: {}, // react e react-dom já são compartilhados (singleton) pelo plugin
        extraOptions: { exposePages: false },
      })
    );
    return config;
  },
};
