import { useEffect, useState } from 'react';
import { ITEM_ADICIONADO } from '../events/pedidoEvents';

// Guarda os itens do pedido e escuta os eventos vindos do Cardápio.
export function usePedido() {
  const [itens, setItens] = useState([]);

  useEffect(() => {
    function aoAdicionar(evento) {
      const item = evento.detail;
      if (!item?.id) return; // ignora eventos fora do contrato

      setItens((atuais) => {
        const existente = atuais.find((i) => i.id === item.id);
        if (existente) {
          // mesmo prato: só aumenta a quantidade
          return atuais.map((i) => (i.id === item.id ? { ...i, quantidade: i.quantidade + 1 } : i));
        }
        return [...atuais, { ...item, quantidade: 1 }];
      });
    }

    window.addEventListener(ITEM_ADICIONADO, aoAdicionar);
    // cleanup: sem isso o StrictMode registra 2 listeners e duplica os itens
    return () => window.removeEventListener(ITEM_ADICIONADO, aoAdicionar);
  }, []);

  const remover = (id) => setItens((atuais) => atuais.filter((i) => i.id !== id));
  const limpar = () => setItens([]);
  const total = itens.reduce((soma, i) => soma + i.preco * i.quantidade, 0);

  return { itens, total, remover, limpar };
}
