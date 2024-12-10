import React, { useState, useEffect } from "react";
import Square from "./Square";

const Board = () => {
    const boardSize = 4;
    const [squares, setSquares] = useState(Array(boardSize * boardSize).fill(null)); // [null, null, null, null, null, null, null, null, null]
    const [isNext, setIsNext] = useState(true);
    const [isAiTurn, setIsAiTurn] = useState(false);
    const [winningLines, setWinningLines] = useState(winningCombinations());
    const winner = calculateWinner(squares, winningLines);

    useEffect(() => {
        if (!isNext && !winner) {
            setIsAiTurn(true);
            setTimeout(() => {
                strategicAiMove(squares, setSquares, setIsNext, winningLines);
                setIsAiTurn(false);
            }, 1000);
        }
    }, [isNext, squares, winner]);

    const handleClick = (i) => {
        if (squares[i] || winner || isAiTurn) return;

        const newSquares = squares.slice();
        newSquares[i] = isNext ? "X" : "O";
        setSquares(newSquares);

        setIsNext(!isNext);
    };

    const restartGame = () => {
        setSquares(Array(boardSize * boardSize).fill(null));
        setIsNext(true);

        setWinningLines(winningCombinations());
    };


    return (
        <div>
            <div className="status">
                {winner ? (
                    <div>
                        <p className={`winner ${winner === "X" ? "winner-player" : "winner-ai"}`}>
                            O vencedor é: {winner}!
                        </p>
                        {<p>Combinações de Vitória: <br />{winningLines.map((line, index) => `(${line.join(", ")})`).join(" - ")}</p>}
                    </div>
                ) : (
                    `Próximo a jogar: ${isNext ? "X" : "O"}`
                )}
                {squares.every(square => square !== null) ? <p>Combinações de Vitória: <br />{winningLines.map((line, index) => `(${line.join(", ")})`).join(" - ")}</p> : ""}
            </div>

            <div>
                {Array.from({ length: boardSize }).map((_, rowIndex) => (
                    <div className="board-row" key={rowIndex}>
                        {squares.slice(rowIndex * boardSize, rowIndex * boardSize + boardSize).map((square, colIndex) => {
                            const index = rowIndex * boardSize + colIndex; // Calcula o índice da celula
                            return (
                                <Square
                                    key={index}
                                    value={square}
                                    onClick={() => handleClick(index)}
                                    index={index}
                                    winningLines={winningLines}
                                    winner={winner}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>

            <button className="reset-button" onClick={restartGame}>
                Reiniciar
            </button>
        </div>
    );
};

// Todas as combinações buscadas pra uma vitória, também usada pra IA determinar seus movimentos
const allCombinations = () => [
    // Combinações Horizontais
    [0, 1, 2], [1, 2, 3],
    [4, 5, 6], [5, 6, 7],
    [8, 9, 10], [9, 10, 11],
    [12, 13, 14], [13, 14, 15],

    // Combiações Verticais
    [0, 4, 8], [4, 8, 12],
    [1, 5, 9], [5, 9, 13],
    [2, 6, 10], [6, 10, 14],
    [3, 7, 11], [7, 11, 15],

    // Combinações Diagonais
    [0, 5, 10], [4, 9, 14],
    [1, 6, 11], [5, 10, 15],
    [3, 6, 9], [7, 10, 13],
    [2, 5, 8], [6, 9, 12],
];


// Função que determina as 3 possibilidades de vitória
const winningCombinations = () => {
    const combinations = allCombinations();

    const embaralhado = combinations.sort(() => Math.random() - 0.5);
    // Seleciona as 3 primeiras combinações embaralhadas
    return embaralhado.slice(0, 3);
};


// Funçao para verificar o vencedor
const calculateWinner = (squares, winningLines) => {
    for (let i = 0; i < winningLines.length; i++) {
        const [a, b, c] = winningLines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
};


// Função para jogada estratégica da IA
const strategicAiMove = (squares, setSquares, setIsNext) => {

    const combinations = allCombinations();

    // Função pra possibilitar jogadas estratégicas da IA
    const findMove = (a, b, c) => {
        if (squares[a] && squares[a] === squares[b] && !squares[c]) return c;
        if (squares[a] && squares[a] === squares[c] && !squares[b]) return b;
        if (squares[b] && squares[b] === squares[c] && !squares[a]) return a;

        return null;
    };

    // Aplica jogada estratégica da IA
    for (let i = 0; i < combinations.length; i++) {

        const [a, b, c] = combinations[i];
        const move = findMove(a, b, c);

        if (move !== null) {
            makeMove(move, squares, setSquares, setIsNext);
            return;
        }
    }

    randomAiMove(squares, setSquares, setIsNext);
};

// Função pra jogada aleatoria IA quando um movimento estrategico não estiver disponivel
const randomAiMove = (squares, setSquares, setIsNext) => {

    // Escolhe um dos 4 centros com 50% de chance(tabuleiro 4x4)
    const centerIndices = [5, 6, 9, 10];
    const availableCenters = centerIndices.filter((index) => squares[index] === null);

    if (availableCenters.length > 0 && Math.random() < 0.5) {
        const randomCenter = availableCenters[Math.floor(Math.random() * availableCenters.length)];
        makeMove(randomCenter, squares, setSquares, setIsNext);
        return;
    }

    const availableMoves = squares
        .map((value, index) => (value === null ? index : null))
        .filter((index) => index !== null);

    // Escolhe outra posição aleatoriamente
    if (availableMoves.length > 0) {

        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        makeMove(availableMoves[randomIndex], squares, setSquares, setIsNext);
    }
};

const makeMove = (index, squares, setSquares, setIsNext) => {

    const newSquares = [...squares];
    newSquares[index] = "O";
    setSquares(newSquares);
    setIsNext(true);
};


export default Board;