import { useEffect } from 'react';
import Cardapio from '../components/Cardapio';
import { ITEM_ADICIONADO } from '../events/pedidoEvents';

// Página para rodar o micro sozinho (http://localhost:3001).
export default function Home() {
  // Só para teste isolado: mostra no console os eventos emitidos
  useEffect(() => {
    const log = (e) => console.log('[cardapio] evento emitido:', e.detail);
    window.addEventListener(ITEM_ADICIONADO, log);
    return () => window.removeEventListener(ITEM_ADICIONADO, log);
  }, []);

  return (
    <main style={{ padding: '1rem', maxWidth: 1100, margin: '0 auto' }}>
      <Cardapio />
    </main>
  );
}
