import {ISolvers} from "./ISolvers";
import {Sudoku, IPos} from "../sudoku";
import {SudokuSquare} from "../SudokuSquare";

enum DIR {
    group,
    line
}

export class Pointer implements ISolvers {
    constructor(private sudoku : Sudoku) {}

    public reduce() {
        for (let i :number = 0; i < 9; i++) {
            this.findPointerPairs(this.sudoku.getRow(i), DIR.line);
            this.findPointerPairs(this.sudoku.getColumn(i), DIR.line);
            this.findPointerPairs(this.sudoku.getGroup(i), DIR.group);
        }
    }

    private findPointerPairs(squares : SudokuSquare[], dir : DIR) : void {
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
            if (options[num].length == 2) {
                if (dir == DIR.line) {
                    this.reducePairInGroup(options[num], num);
                } else if (dir == DIR.group) {
                    this.reducePairInLine(options[num], num);
                }
            }
        });
    }

    private reducePairInLine(squares : SudokuSquare[], notNum : number) {
        let firstPos : IPos = this.sudoku.getSquarePosition(squares[0]);
        let secondPos : IPos = this.sudoku.getSquarePosition(squares[1]);

        if (firstPos.y == secondPos.y) {
            this.sudoku.getColumn(firstPos.y).forEach(this.reduceSquaresNum(squares, notNum).bind(this));
        } else if (firstPos.x == secondPos.x) {
            this.sudoku.getRow(firstPos.x).forEach(this.reduceSquaresNum(squares, notNum).bind(this));
        }
    }

    private reducePairInGroup(squares : SudokuSquare[], notNum : number) {
        let groupID : number = this.sudoku.getGroupID(squares[0]);
        // first confirm that both squares are within the same group
        if (groupID != this.sudoku.getGroupID(squares[1])) return;

        this.sudoku.getGroup(groupID).forEach(this.reduceSquaresNum(squares, notNum));
    }

    private reduceSquaresNum(squares : SudokuSquare[], notNum : number) {
        return (square : SudokuSquare) => {
            // don't remove the option from our good squares
            if (squares.indexOf(square) == -1) {
                square.notNumber(notNum);
            }
        };
    }
}