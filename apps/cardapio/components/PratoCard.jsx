import styles from './Cardapio.module.css';

const moeda = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

// Card de um prato. Não conhece eventos: só avisa o pai via onAdicionar.
export default function PratoCard({ prato, onAdicionar }) {
  return (
    <article className={styles.card}>
      <h3 className={styles.nome}>{prato.nome}</h3>
      <p className={styles.descricao}>{prato.descricao}</p>
      <div className={styles.rodape}>
        <span className={styles.preco}>{moeda.format(prato.preco)}</span>
        <button type="button" className={styles.botao} onClick={onAdicionar}>
          Adicionar ao pedido
        </button>
      </div>
    </article>
  );
}
