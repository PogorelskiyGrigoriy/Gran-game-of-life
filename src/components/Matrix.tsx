import React, { ReactNode } from 'react'
import LifeGameService from "../services/LifeGameService";
import { getRandomIntMatrix } from "../utils/random";
import matrixData from "../config/matrix-config";

function Matrix() {
    const {rows, columns, ticInterval} = matrixData
    const [matrix, setMatrix] = React.useState<number[][]>([])
    const lifeGame = React.useRef<LifeGameService>(null)
    
    React.useEffect(() => {
            lifeGame.current = new LifeGameService(getRandomIntMatrix(rows, columns, 0, 1))
            setMatrix(lifeGame.current.matrix)
    }, [rows, columns])
    React.useEffect(() => {
    function tic() {
        if (lifeGame.current) {
            // Вызываем расчет следующего поколения по правилам игры
            const newMatrix = lifeGame.current.nextTurn();
            // Обновляем состояние, чтобы React перерисовал сетку
            setMatrix([...newMatrix]); 
        }
    }

    const intervalId = setInterval(tic, ticInterval);
    
    // Очистка интервала при размонтировании компонента
    return () => clearInterval(intervalId);
}, [ticInterval]);
    function getCells(matrix: number[][]): ReactNode {
        return matrix.map((row, rInd) => {
            return row.map((cellValue, cInd) => <div key={`${rInd}-${cInd}`}
             className={`cell ${cellValue ? "cell-alive" : "cell-dead"}`}></div>)
        })
    }
  return (
    <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: '80vh',
        height: '80vh'
    }}>
      {getCells(matrix)}
    </div>
  )
}

export default Matrix
