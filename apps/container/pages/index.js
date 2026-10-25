import { lazy, Suspense, useEffect, useState } from 'react';
import MicroBoundary from '../components/MicroBoundary';
import styles from '../styles/Home.module.css';

// Módulos remotos: "nomeDoRemote/móduloExposto"
const Cardapio = lazy(() => import('cardapio/Cardapio'));
const Pedido = lazy(() => import('pedido/Pedido'));

export default function Home() {
  // Os micros só são renderizados no navegador (evita erros de SSR/hidratação)
  const [noNavegador, setNoNavegador] = useState(false);
  useEffect(() => setNoNavegador(true), []);

  return (
    <>
      <header className={styles.header}>
        <h1>Restaurante EBAC</h1>
      </header>

      {noNavegador && (
        <main className={styles.layout}>
          <MicroBoundary nome="Cardápio">
            <Suspense fallback={<p className={styles.carregando}>Carregando cardápio…</p>}>
              <Cardapio />
            </Suspense>
          </MicroBoundary>

          <div className={styles.lateral}>
            <MicroBoundary nome="Pedido">
              <Suspense fallback={<p className={styles.carregando}>Carregando pedido…</p>}>
                <Pedido />
              </Suspense>
            </MicroBoundary>
          </div>
        </main>
      )}
    </>
  );
}
