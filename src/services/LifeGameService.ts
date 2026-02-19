import { getRandomIntMatrix } from "../utils/random";

export default class LifeGameService {

    // Константа для обхода соседей (8 направлений)
    private static readonly NEIGHBOR_OFFSETS = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1],  [1, 0],  [1, 1],
    ];

    constructor(private _matrix: number[][]){ }
    get matrix() {
        return this._matrix
    }
    nextMatrix(): number[][] {
        return getRandomIntMatrix(this._matrix.length, this._matrix[0].length, 0, 1);
    }

    // Метод для расчета следующего поколения по правилам игры
    nextTurn(): number[][] {

        const nextGen = this._matrix.map((row, rIdx) =>
            row.map((cell, cIdx) => {
                const liveNeighbors = this.countLiveNeighbors(rIdx, cIdx);

                // Логика Конвея
                if (cell) {
                    // Живая клетка: 2 или 3 соседа — живет, иначе — смерть
                    return +(liveNeighbors === 2 || liveNeighbors === 3)
                } else {
                    // Мертвая клетка: ровно 3 соседа — рождение
                    return +(liveNeighbors === 3)
                }
            })
        );

        this._matrix = nextGen;
        return this._matrix;
    }

    /**
     * Вспомогательный метод для подсчета живых соседей
     * Здесь переменные rows и cols используются для проверки границ
     */
    private countLiveNeighbors(row: number, col: number): number {
        const rows = this._matrix.length;
        const cols = this._matrix[0].length;
        let count = 0;

        LifeGameService.NEIGHBOR_OFFSETS.forEach(([dr, dc]) => {
            const newRow = row + dr;
            const newCol = col + dc;

            // Проверка, чтобы индекс не вышел за пределы массива
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                count += this._matrix[newRow][newCol];
            }
        });

        return count;
    }
}


