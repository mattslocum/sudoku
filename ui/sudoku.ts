import {SudokuSquare} from "./SudokuSquare";

export class Sudoku {
    /** @type {Array} Left to right, top to bottom array of numbers */
    private squares : SudokuSquare[] = [];

    /**
     * @param numbers Left to right, top to bottom array of numbers
     */
    constructor(numbers : number[]) {
        numbers.forEach((num) => {
            this.squares.push(new SudokuSquare(num))
        });
    }

    public elimiate() : void {
        this.elimiateOptions();
    }

    private elimiateOptions() : void {
        for (let i :number = 0; i < 9; i++) {
            this.eliminateSet(this.getRow(i));
            this.eliminateSet(this.getColumn(i));
            this.eliminateSet(this.getGroup(i));
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

    private getRow(rowNum : number) : SudokuSquare[] {
        return this.squares.slice(rowNum * 9, rowNum * 9 + 9);
    }

    private getColumn(colNum : number) : SudokuSquare[] {
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
        for (let i :number = 0; i < 9; i++) {
            this.identifySet(this.getRow(i));
            this.identifySet(this.getColumn(i));
            this.identifySet(this.getGroup(i));
        }
    }

    private identifySet(squares : SudokuSquare[]) : void {
        for (let i : number = 0; i < squares.length; i++) {
            if (squares[i].isFound()) {
                let num : number = squares[i].number;
                for (let checkIndex : number = 0; checkIndex < squares.length; checkIndex++) {
                    squares[checkIndex].tryIdentify();
                }
            }
        }
    }

}