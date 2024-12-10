import React from 'react'

const Square = ({ value, onClick, index, winningLines, winner }) => {
    // Verifica se o índice está nas combinções de vitória
    const isCombinationWinning = winningLines.some(line => line.includes(index));
  
    // A célula só muda de cor quando selecionada e se for parte das combinções de vitória ou no final do jogo(winner)
    const changeColor = (value && isCombinationWinning) || (isCombinationWinning && winner);
  
    return (
      <button
        className={`square ${changeColor ? "winning" : ""}`} // Aplica a classe winning se a célula for vencedora
        onClick={onClick}
      >
        <span className="value">{value}</span>
        <span className="index">{index}</span>
      </button>
    );
  };
  
  

export default Square