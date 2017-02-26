import {Sudoku} from "../sudoku";

export interface ISolvers {
    reduce : Function;
}

interface IReduceFunction {
    (suduko: Sudoku): void
}