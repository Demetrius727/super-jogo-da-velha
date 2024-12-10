
import Board from './components/Board'

function App() {

  return (
    <div className='App'>
    <h1>Super Jogo da Velha</h1>
    <p>No inicio da partida, o algoritmo seleciona apenas 3 combinações de vitória.</p>
    <p>Forme antes da IA umas das 3 combinações para ser o vencedor.</p>
    <p>Uma célula fica amarela quando ela faz parte de uma combinação vencedora.</p>
      <Board />
    </div>
  )
}

export default App
