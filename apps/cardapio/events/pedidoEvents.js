// Contrato de comunicação entre micros.
// Deve ser idêntico em apps/cardapio e apps/pedido.
export const ITEM_ADICIONADO = 'pedido:item-adicionado';

/**
 * Avisa a página que um prato foi adicionado ao pedido.
 * @param {{ id: string, nome: string, preco: number }} item
 */
export function emitirItemAdicionado(item) {
  if (typeof window === 'undefined') return; // proteção para o SSR do Next
  window.dispatchEvent(new CustomEvent(ITEM_ADICIONADO, { detail: item }));
}
