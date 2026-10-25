import Pedido from '../components/Pedido';
import { emitirItemAdicionado } from '../events/pedidoEvents';

// Página para rodar o micro sozinho (http://localhost:3002).
// O botão simula o Cardápio, que não existe aqui.
export default function Home() {
  return (
    <main style={{ padding: '1rem', maxWidth: 480, margin: '0 auto' }}>
      <button
        type="button"
        onClick={() => emitirItemAdicionado({ id: 'teste', nome: 'Prato de teste', preco: 10 })}
        style={{ marginBottom: '1rem', minHeight: 44 }}
      >
        Simular item adicionado
      </button>
      <Pedido />
    </main>
  );
}
