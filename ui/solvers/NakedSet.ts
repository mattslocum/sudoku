import {ISolvers} from "./ISolvers";
import {Sudoku, IPos} from "../sudoku";
import {SudokuSquare} from "../SudokuSquare";

export class NakedSet implements ISolvers {
    constructor(private sudoku: Sudoku) {}

    public reduce() {
        for (let i :number = 0; i < 9; i++) {
            this.findNakedSet(this.sudoku.getRow(i));
            this.findNakedSet(this.sudoku.getColumn(i));
            this.findNakedSet(this.sudoku.getGroup(i));
        }
    }

    private findNakedSet(squares : SudokuSquare[]) : void {
        let options : any = {};

        for (let i : number = 0; i < squares.length; i++) {
            if (!squares[i].isFound()) {
                let possible : number[] = squares[i].getPossible();
                let possibleKey : string = possible.join('');

                if (!options[possibleKey]) {
                    options[possibleKey] = [];
                }

                options[possibleKey].push(squares[i]);
            }
        }

        Object.keys(options).forEach((index : string) => {
            // if we have an exact match between possible numbers and squares, then they are exclusive
            // doing more than a NakedQuad is dumb
            if (options[index].length == index.length && index.length <= 4) {
                this.reduceNakedSet(squares, options[index]);
            }
        });
    }

    private reduceNakedSet(squares : SudokuSquare[], exclusiveSet : SudokuSquare[]) : void {
        let reduceNum : number[] = exclusiveSet[0].getPossible();

        squares.forEach((square) => {
            // don't reduce our exclusive set
            if (exclusiveSet.indexOf(square) == -1) {
                reduceNum.forEach((num) => {
                    square.notNumber(num);
                });
            }
        })
    }
}