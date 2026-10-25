import { usePedido } from '../hooks/usePedido';
import styles from './Pedido.module.css';

const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

// Componente exposto via Module Federation (./Pedido).
export default function Pedido() {
  const { itens, total, remover, limpar } = usePedido();

  return (
    <aside className={styles.pedido} aria-labelledby="titulo-pedido">
      <h2 id="titulo-pedido" className={styles.titulo}>Seu pedido</h2>

      {itens.length === 0 ? (
        <p className={styles.vazio}>Nenhum item ainda. Escolha algo no cardápio.</p>
      ) : (
        <ul className={styles.lista}>
          {itens.map((item) => (
            <li key={item.id} className={styles.item}>
              <span>{item.quantidade}× {item.nome}</span>
              <span>{moeda.format(item.preco * item.quantidade)}</span>
              <button
                type="button"
                className={styles.remover}
                onClick={() => remover(item.id)}
                aria-label={`Remover ${item.nome}`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className={styles.total} aria-live="polite">
        Total: <strong>{moeda.format(total)}</strong>
      </p>
      {itens.length > 0 && (
        <button type="button" className={styles.limpar} onClick={limpar}>
          Limpar pedido
        </button>
      )}
    </aside>
  );
}
