import React, { ReactNode } from "react";
import LifeGameService from "../services/LifeGameService";
import { getRandomIntMatrix } from "../utils/random";
import matrixData from "../config/matrix-config";

function Matrix() {
  const { rows, columns, ticInterval } = matrixData;

  // 1. Используем ленивую инициализацию стейта, чтобы сразу видеть картинку
  const [matrix, setMatrix] = React.useState<number[][]>(() =>
    getRandomIntMatrix(rows, columns, 0, 1),
  );

  // 2. Создаем сервис, передавая ему ТУ ЖЕ начальную матрицу
  const lifeGame = React.useMemo(() => {
    return new LifeGameService(matrix);
  }, [rows, columns]);

  React.useEffect(() => {
    function tic() {
      if (lifeGame) {
        const newMatrix = lifeGame.nextTurn();
        // Важно: создаем новый массив массивов для триггера рендера
        setMatrix([...newMatrix.map((row) => [...row])]);
      }
    }

    const intervalId = setInterval(tic, ticInterval);
    return () => clearInterval(intervalId);
  }, [lifeGame, ticInterval]); // Добавили lifeGame в зависимости

  function getCells(matrix: number[][]): ReactNode {
    return matrix.map((row, rInd) =>
      row.map((cellValue, cInd) => (
        <div
          key={`${rInd}-${cInd}`}
          className={`cell ${cellValue ? "cell-alive" : "cell-dead"}`}
        />
      )),
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gridTemplateRows: `repeat(${rows}, 1fr)`,
        width: "80vh",
        height: "80vh",
        gap: "1px", // Добавим сетку для наглядности
      }}
    >
      {getCells(matrix)}
    </div>
  );
}

export default Matrix;
