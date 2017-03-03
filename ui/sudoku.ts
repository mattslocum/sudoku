import {SudokuSquare} from "./SudokuSquare";
import {Elimination} from "./solvers/Elimination";
import {ISolvers} from "./solvers/ISolvers";
import {SingleOption} from "./solvers/SingleOption";
import {Pointer} from "./solvers/Pointer";
import {NakedSet} from "./solvers/NakedSet";
import {HiddenSet} from "./solvers/HiddenSet";

export interface IPos {
    x : number;
    y : number;
}

export class Sudoku {
    /** @type {Array} Left to right, top to bottom array of numbers */
    private squares : SudokuSquare[] = [];
    // TODO: run only 1 solver and don't do the next one unless the first one doesn't
    //       return a change.
    private solvers : ISolvers[] = [
        new Elimination(this),
        new SingleOption(this),
        new Pointer(this),
        new NakedSet(this),
        // Do we need hidden set and NakedSet. Hidden will find Naked too, but not as
        // optimally. Keep them both since in the future we will do the todo above.
        new HiddenSet(this)
    ];

    /**
     * @param numbers Left to right, top to bottom array of numbers
     */
    constructor(numbers : number[]) {
        numbers.forEach((num) => {
            this.squares.push(new SudokuSquare(num))
        });
    }

    public reduce() : void {
        this.solvers.forEach((solver) => {
            solver.reduce(this);
            this.identify();
        });
    }

    public getRow(rowNum : number) : SudokuSquare[] {
        return this.squares.slice(rowNum * 9, rowNum * 9 + 9);
    }

    public getColumn(colNum : number) : SudokuSquare[] {
        let column : SudokuSquare[] = [];

        for (let i : number = 0; i < 9; i++) {
            column.push(this.squares[i * 9 + colNum]);
        }

        return column;
    }

    public getGroup(groupNum : number) : SudokuSquare[] {
        let group : SudokuSquare[] = [];
        let xOffset : number = (groupNum % 3) * 3;
        let yOffset : number = Math.floor(groupNum / 3) * 3;

        for (let y = 0; y < 3; y++) {
            for (let x = 0; x < 3; x++) {
                group.push(this.squares[
                    ((y + yOffset) * 9) + (x + xOffset)
                ]);
            }
        }

        return group;
    }

    public identify() : void {
        for (let i : number = 0; i < this.squares.length; i++) {
            if (this.squares[i].isFound()) {
                let num : number = this.squares[i].number;
                for (let checkIndex : number = 0; checkIndex < this.squares.length; checkIndex++) {
                    this.squares[checkIndex].tryIdentify();
                }
            }
        }
    }

    public getSquarePosition(square : SudokuSquare) : IPos {
        let index : number = this.squares.indexOf(square);

        return {
            x: Math.floor(index / 9),
            y: index % 9
        };
    }

    public getGroupID(square : SudokuSquare) : number {
        let index : number = this.squares.indexOf(square);

        return (Math.floor(index / 27) * 3) + Math.floor((index % 9) / 3);
    }
}
