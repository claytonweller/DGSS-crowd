import React from 'react';

export function TttGrid({ moduleState, sendInteraction }) {
  const mockGrid = [
    [
      { X: [], O: [], locked: false, winner: '' },
      { X: ['xo91blz4eZzKm0RSDewniw=='], O: [], locked: false, winner: 'X' },
      { X: [], O: [], locked: false, winner: '' },
    ],
    [
      { X: [], O: ['BJeSJwgvC00kGlFX++495Q=='], locked: false, winner: 'O' },
      { X: [], O: [], locked: false, winner: '' },
      { X: [], O: [], locked: false, winner: '' },
    ],
    [
      { X: [], O: [], locked: false, winner: '' },
      { X: [], O: [], locked: false, winner: '' },
      { X: [], O: [], locked: false, winner: '' },
    ],
  ];

  const mockState = {
    step: 'in-progress',
    team: 'O',
    position: { height: 1, width: 2, team: 'O', awsId: 'b7RV8+LNrYlbTS4kDi8Yxw==' },
    grid: mockGrid,
  };

  const buildGridDisplay = (grid) => {
    return <div style={createGridStyle(grid)}>{createAllCells(grid)}</div>;
  };

  const createGridStyle = (grid) => {
    const largeGrid = grid.length > 3 || grid[0].leng > 3;
    const gap = largeGrid ? '1vw' : '3vw';
    const wideScreen = window.innerWidth > window.innerHeight;
    const displaySize = wideScreen ? '70vh' : '90vw';
    return {
      backgroundColor: 'salmon',
      display: 'grid',
      height: displaySize,
      width: displaySize,
      gridTemplateColumns: templateStyle(grid[0]),
      gridTemplateRows: templateStyle(grid),
      columnGap: gap,
      rowGap: gap,
    };
  };

  const templateStyle = (gridArray) => {
    let arr = [];
    for (let i = 0; i < gridArray.length; i++) {
      arr.push('1fr');
    }
    return arr.join(' ');
  };

  const createAllCells = (grid) => {
    return grid.reduce((cells, row, i) => {
      return [...cells, createAllCellsInARow(row, i)];
    }, []);
  };

  const createAllCellsInARow = (row, rPosition) => {
    return row.map((cellData, cPosition) => {
      return createCell(cellData, rPosition, cPosition);
    });
  };

  const createCell = (cellData, height, width) => {
    const heightMatch = height === moduleState.position.height;
    const widthMatch = width === moduleState.position.width;
    const { team } = moduleState.position;
    let backgroundColor = 'white';
    let winner = cellData.winner;
    let color = 'black';
    if (cellData.winner) {
      backgroundColor = 'lightgrey';
    } else if (heightMatch && widthMatch) {
      backgroundColor = '#606080';
      color = 'white';
      winner = team;
    } else if (heightMatch || widthMatch) {
      backgroundColor = '#ddddff';
    }

    let onClick = () => sendInteraction('ttt-choice', { height, width, team });
    if (winner) {
      onClick = () => console.log('Cannot Select');
    }

    return (
      <div
        key={`cell-${height}=${width}`}
        style={{
          color,
          backgroundColor,
          gridColumnStart: width + 1,
          gridColumnEnd: width + 2,
          gridRowStart: height + 1,
          gridRowEnd: height + 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        onClick={onClick}
      >
        <div style={{ fontSize: '100%' }}>{winner}</div>
      </div>
    );
  };

  return <div style={{ display: 'flex', justifyContent: 'center' }}>{buildGridDisplay(moduleState.grid)}</div>;
  // return <div style={{ display: 'flex', justifyContent: 'center' }}>{buildGridDisplay(mockGrid)}</div>;
}
