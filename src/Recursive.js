import {store} from './index';
import * as actions from './store/actions/actions';


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

const recursiveSearch = (y, x, prevY = null, prevX = null) => {
    store.dispatch(actions.updateCurrentLocation({y: y, x:x}));// redux dispatch

    console.log(y + '  ' + x);
   //return setTimeout(() => {
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
        if(grid[y+1]) {
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
                return "end point found at" + y +'y ' + (x-1) +'x';
            }
        }
        if (grid[y+1]) {
            if((grid[y+1][x] === 4 || grid[y+1][x] === 1) && ((y+1) !== prevY || x !== prevX)) {
                return recursiveSearch(y+1, x, y, x);
            }
        }
        if(grid[y][x+1] || grid[y][x+1] === 0) {
            if((grid[y][x+1] === 4 || grid[y][x+1] === 1) && (y !== prevY || (x+1) !== prevX)) {
                return recursiveSearch(y,x+1, y, x);
            }
        }
        if(grid[y-1]){
            if((grid[y-1][x] === 4 || grid[y-1][x] === 1) && ((y-1) !== prevY || x !== prevX)) {
                return recursiveSearch(y-1, x, y, x);
            }
        }
        if(grid[y][x-1] || grid[y][x-1] === 0 ) {
            if ((grid[y][x - 1] === 4 || grid[y][x - 1] === 1) && (y !== prevY || (x - 1) !== prevX)) {
                return recursiveSearch(y, x - 1, y, x);
            }
        }
        else {
            return "No solution found"
        }
    //},500);//End Timeout
};


export default start;


//enter function with starting point
 //check if there is a cell above
 //if yes check to see if its a wall
 //not a wall --end point? -- empty space = move into space Recall function with new location
 //yes Top is a Wall Or doesn't exist- Is there a cell right? - Yes? check if its a wall - No not a wall - move into space recall function with new location
 //continue in this pattern clockwise -- If no results are found Move into Back Track Scenario

//---back track scenario---\\
//steps into dead end
//needs to go back one move and look for a new path
//search Counter Clockwise for an adjacent '4' starting below
//move into it
// search for new open space -- if found move into
// if not -- search for adjacent 4 -- Now there is two adjacent 4s -- how to prevent from going back down dead end???? Pass Previous Location
//With previous location you can prevent the search from getting stuck in a back track loop between two cells