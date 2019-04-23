import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import search from './algs';

class App extends Component {

    state = {
        gridSize: 6,
        grid: [
            [0,0,0,0,0,0], // 0 empty  1 start   2 end   3 wall   4 traveled
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0],
            [0,0,0,0,0,0]
        ],
        editMode: false
    };

    gridSizeHelper = (val) => {
        this.setState({gridSize: val});
        this.buildGridArray(val);
    };

    findSameType = (grid, type) => {
        let ri = null;
        let ci = null;
        ri = grid.findIndex(value => {
            ci = value.findIndex(val => val === type);
            return ci !== -1;
        });
        if(ri !== -1){
            grid[ri][ci] = 0;
        }
    };


    selectCellHandler = (mode, rowIndex, cellIndex) => {
        let grid = [...this.state.grid];
        switch (mode){
            default:
                return;
            case "start":
                this.findSameType(grid, 1);
                grid[rowIndex][cellIndex] = 1;
                this.setState({grid:grid});
                break;
            case "end":
                this.findSameType(grid, 2);
                grid[rowIndex][cellIndex] = 2;
                this.setState({grid:grid});
                break;
            case "wall":
                grid[rowIndex][cellIndex] = 3;
                this.setState({grid:grid});
                break;
        }
    };

    buildGridArray = (size) => {
        let grid =[];
        let rowCounter = 0;
        while(rowCounter < size) {
            let row = [];
            let  counter = 0;
            while(counter < size) {
                row.push(0);
                counter++;
            }
            grid.push(row);
            rowCounter++;
        }
        this.setState({grid: grid})
    };

    renderGrid = () => {
        let editMode = this.state.editMode;
        let rowCounter = 0;
        let grid = this.state.grid;
        return grid.map(val => {
            let counter = 0;
            rowCounter++;
           return (
               <div className="row" key={rowCounter}>
                   {val.map(val => {
                       let c = counter;
                       let rc = rowCounter - 1;
                       let classes = ["cell"];
                       if(editMode === "start"){
                           classes.push("selectStart")
                       }
                       if(editMode === "end"){
                           classes.push("selectEnd")
                       }
                       if(editMode === "wall"){
                           classes.push("selectWall")
                       }
                       if(val === 1) {
                           classes.push("startingSpace");
                       }
                       if(val === 2) {
                           classes.push("endingSpace");
                       }
                       if(val === 3) {
                           classes.push("walls");
                       }
                       if(val === 4) {
                           classes.push("traveled");
                       }
                       counter++;
                       return (
                           <div className={classes.join(' ')} onClick={(event) => this.selectCellHandler(editMode, rc, c)} key={counter}></div>
                       )
                   })}
               </div>
           )
        });
    };

    DrawMode = (val) => {
        if(this.state.editMode === val) {
            this.setState({editMode: false});
        } else {
            this.setState({editMode: val});
        }
    };

    startSearch = () => {
      console.log(this.state.grid);
      console.log(search(this.state.grid));
    };

  render() {

      let startButton = ["button"];
      let endButton = ["button"];
      let wallButton = ["button"];
      if(this.state.editMode === "start") {
          startButton.push("selected");
      }
      if(this.state.editMode === "end") {
          endButton.push("selected");
      }
      if(this.state.editMode === "wall") {
          wallButton.push("selected");
      }

    return (
        <div className="container">
            <h1>Maze Runner</h1>
            <div className="controls">
                <div className="buildControls">
                    <button id="start" className={startButton.join(' ')} onClick={() => this.DrawMode("start")}></button>
                    <button id="stop" className={endButton.join(' ')} onClick={() => this.DrawMode("end")}></button>
                    <button id="wall" className={wallButton.join(' ')} onClick={() => this.DrawMode("wall")}></button>
                </div>
                <div className="runControls">
                    <select className="dropDown" id="gridSize" onChange={(event) => this.gridSizeHelper(event.target.value)} value={this.state.gridSize}>
                        <option value="6">6x6</option>
                        <option value="8">8x8</option>
                        <option value="10">10x10</option>
                    </select>
                    <select className="dropDown" id="alg">
                        <option value="0">Recursive search</option>
                    </select>
                    <button id="startRunning" onClick={() => this.startSearch()}>Start</button>
                </div>
            </div>

            <div className="grid">
                {this.renderGrid()}
            </div>
        </div>
    );
  }
}

export default App;
