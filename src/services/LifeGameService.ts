import { getRandomIntMatrix } from "../utils/random";

export default class LifeGameService {

    constructor(private _matrix: number[][]){ }
    get matrix() {
        return this._matrix
    }
    nextMatrix(): number[][] {
        return getRandomIntMatrix(this._matrix.length, this._matrix[0].length, 0, 1);
    }
}

