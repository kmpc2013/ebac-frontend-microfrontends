import { pratos } from '../data/pratos';
import { emitirItemAdicionado } from '../events/pedidoEvents';
import PratoCard from './PratoCard';
import styles from './Cardapio.module.css';

// Componente exposto via Module Federation (./Cardapio).
export default function Cardapio() {
  return (
    <section className={styles.cardapio} aria-labelledby="titulo-cardapio">
      <h2 id="titulo-cardapio" className={styles.titulo}>Cardápio</h2>
      <ul className={styles.lista}>
        {pratos.map((prato) => (
          <li key={prato.id}>
            <PratoCard
              prato={prato}
              onAdicionar={() =>
                emitirItemAdicionado({ id: prato.id, nome: prato.nome, preco: prato.preco })
              }
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
