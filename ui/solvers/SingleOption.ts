import {ISolvers} from "./ISolvers";
import {Sudoku} from "../sudoku";
import {SudokuSquare} from "../SudokuSquare";

export class SingleOption implements ISolvers {
    constructor(private sudoku : Sudoku) {}

    public reduce() {
        for (let i :number = 0; i < 9; i++) {
            this.FindSingle(this.sudoku.getRow(i));
            this.FindSingle(this.sudoku.getColumn(i));
            this.FindSingle(this.sudoku.getGroup(i));
        }
    }

    private FindSingle(squares : SudokuSquare[]) : void {
        let options : any = {
            1: [],
            2: [],
            3: [],
            4: [],
            5: [],
            6: [],
            7: [],
            8: [],
            9: [],
        };

        for (let i : number = 0; i < squares.length; i++) {
            if (squares[i].isFound()) {
                delete options[squares[i].number];
            } else {
                squares[i].getPossible().forEach((num) => {
                    if (!options[num]) return;
                    options[num].push(squares[i]);
                });
            }
        }

        Object.keys(options).forEach((index : string) => {
            let num : number = parseInt(index);
            if (options[num].length == 1) {
                options[num][0].number = num;
            }
        });
    }
}