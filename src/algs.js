
const search = (grid, startY, startX) => {
    let current = null;
    if(current)
    // grid[y][x]
    if(grid[startY][startX -1]) {

    }
};

const recursiveSearch = (grid) => {
    //find index of 1 (start)
    let startCell = null;
    let startRow = grid.findIndex(value => {
        startCell = value.findIndex(val => val === 1);
        return startCell !== -1;
    });
    if(startRow !== -1) {
       return search(grid, startRow, startCell);
    } else {
        return "No starting point";
    }
};

export default recursiveSearch;