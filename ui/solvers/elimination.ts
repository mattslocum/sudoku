import {ISolvers} from "./ISolvers";
import {Sudoku} from "../sudoku";
import {SudokuSquare} from "../SudokuSquare";

export class Elimination implements ISolvers {
    public reduce(sudoku : Sudoku) {
        for (let i :number = 0; i < 9; i++) {
            this.eliminateSet(sudoku.getRow(i));
            this.eliminateSet(sudoku.getColumn(i));
            this.eliminateSet(sudoku.getGroup(i));
        }
    }

    private eliminateSet(squares : SudokuSquare[]) : void {
        for (let i : number = 0; i < squares.length; i++) {
            if (squares[i].isFound()) {
                let num : number = squares[i].number;
                for (let checkIndex : number = 0; checkIndex < squares.length; checkIndex++) {
                    squares[checkIndex].notNumber(num);
                }
            }
        }
    }
}