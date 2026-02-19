import React, { useEffect, useState, useMemo } from 'react';
import LifeGameService from "../services/LifeGameService";
import { getRandomIntMatrix } from "../utils/random";
import matrixData from "../config/matrix-config";

const Matrix: React.FC = () => {
    const { rows, columns, ticInterval } = matrixData;

    // 1. Используем useMemo как "хранилище" для всего, что не должно меняться.
    // Мы создаем и матрицу, и сервис ОДИН РАЗ внутри этого блока.
    // Теперь компилятор спокоен: зависимости [] честные, так как внутри нет внешних переменных.
    const { initialMatrix, lifeGame } = useMemo(() => {
        const matrix = getRandomIntMatrix(rows, columns, 0, 1);
        const service = new LifeGameService(matrix);
        return { initialMatrix: matrix, lifeGame: service };
    }, [rows, columns]);

    // 2. Инициализируем стейт начальной матрицей из нашего хранилища
    const [matrix, setMatrix] = useState<number[][]>(initialMatrix);

    // 3. Оптимизируем отрисовку ячеек
    const renderedCells = useMemo(() => {
        return matrix.map((row, rInd) => 
            row.map((cellValue, cInd) => (
                <div 
                    key={`${rInd}-${cInd}`}
                    className={`cell ${cellValue ? "cell-alive" : "cell-dead"}`}
                />
            ))
        );
    }, [matrix]);

    // 4. Игровой цикл
    useEffect(() => {
        const tic = () => {
            const nextGen = lifeGame.nextTurn();
            // Делаем глубокую копию, чтобы React "проснулся"
            setMatrix([...nextGen.map(row => [...row])]);
        };

        const intervalId = setInterval(tic, ticInterval);
        return () => clearInterval(intervalId);
    }, [lifeGame, ticInterval]);

    return (
        <div 
            style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${columns}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                width: '80vh',
                height: '80vh',
                gap: '1px'
            }}
        >
            {renderedCells}
        </div>
    );
};

export default Matrix;