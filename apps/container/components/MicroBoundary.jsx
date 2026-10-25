import { Component } from 'react';

// Se um micro lançar erro ao renderizar, mostra um aviso em vez de quebrar a página inteira.
// (Micro fora do ar: o próprio nextjs-mf renderiza vazio e loga "<micro> offline" no console.)
export default class MicroBoundary extends Component {
  state = { erro: false };

  static getDerivedStateFromError() {
    return { erro: true };
  }

  componentDidCatch(error) {
    console.error(`[container] falha ao carregar ${this.props.nome}:`, error);
  }

  render() {
    if (this.state.erro) {
      return <p role="alert">Não foi possível exibir o {this.props.nome}.</p>;
    }
    return this.props.children;
  }
}
