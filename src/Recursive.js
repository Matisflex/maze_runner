let grid = null;
 const start = (grid2) => {
     grid = grid2;
     //find index of 1 (start)
     let startCell = null;
     let startRow = grid.findIndex(value => {
         startCell = value.findIndex(val => val === 1);
         return startCell !== -1;
     });
     return recursiveSearch(startRow, startCell);
 };

const recursiveSearch = (y, x) => { // init values y=5 x=0


    console.log(y + '  ' + x);
    if(grid[y-1]){
        if(grid[y-1][x] === 0) {
            grid[y-1][x] = 4;
            return recursiveSearch(y-1, x);
        }
        if(grid[y-1][x] === 2) {
            return 'end point found at    ' + (y-1) +' Y   --   ' + x + ' X';
        }
    }
    if(grid[y][x+1] || grid[y][x+1] === 0) {
        if(grid[y][x+1] === 0) {
            grid[y][x+1] = 4;
           return recursiveSearch(y,x+1);
        }
        if(grid[y][x+1] === 2) {
            return "end point found at" + y +'y ' + (x+1) +'x';
        }
    }
    if(grid[y+1] || grid[y+1][x] === 0) {
        if(grid[y+1][x] === 0) {
            grid[y+1][x] = 4;
            return recursiveSearch(y+1,x);
        }
        if(grid[y+1][x] === 2) {
            return "end point found at" + (y+1) +'y ' + x +'x';
        }
    }
    if(grid[y][x-1] || grid[y][x-1] === 0 ) {
        if(grid[y][x-1] === 0) {
            grid[y][x-1] = 4;
            return recursiveSearch(y,x-1);
        }
        if(grid[y][x-1] === 2) {
            return "end point found at" + y +'y ' + x-1 +'x';
        }
    } else {
        return "No solution found"
    }
};


export default start;


//enter function with starting point
 //check if there is a cell above
 //if yes check to see if its a wall
 //not a wall --end point? -- empty space = move into space Recall function with new location
 //yes Top is a Wall Or doesn't exist- Is there a cell right? - Yes? check if its a wall - No not a wall - move into space recall function with new location