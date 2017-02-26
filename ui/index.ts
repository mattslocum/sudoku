import * as jQuery from "jquery";
import {Sudoku} from "./sudoku";
import {SudokuSquare} from "./SudokuSquare";
import {games} from "./games";

let mySudoku : Sudoku;

jQuery(() => {
    jQuery('#start').click(() => {
        init((<any>games)[jQuery('#games').val()]);
    });

    jQuery('#eliminate').click(() => {
        mySudoku.elimiate();
        populateGrid();
    });

    jQuery('#identify').click(() => {
        mySudoku.identify();
        populateGrid();
    });

    let selectOptions : string = '';
    Object.keys(games).forEach((name) => {
        selectOptions += `<option>${name}</option>`;
    });
    jQuery('#games').html(selectOptions);

});

function init(boxes : number[]) {
    // Elimination only Set:
    mySudoku = new Sudoku(boxes);

    (<any>window)['mySudoku'] = mySudoku;

    populateGrid();
}

function populateGrid() {
    for (let i : number = 0; i < 9; i++) {
        let group : SudokuSquare[] = mySudoku.getGroup(i);

        jQuery(`.boxGroup:eq(${i}) .box`).each((nBox, elem) => {
            jQuery(elem).text(
                group[nBox].isFound() ? group[nBox].number : ''
            );
        })
    }
}