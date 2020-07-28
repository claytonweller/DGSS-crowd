import React from 'react';
import Slider from '../../utilities/Slider';

export function TttGrid({ moduleState }) {
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

  const buildGridDisplay = (grid) => {
    const gridHeight = grid.length;
    const gridWidth = grid[0].length;
    return (
      <div style={createGridStyle(grid)}>
        {createAllCells(grid)}
        <div
          style={{
            gridArea: `1 / ${gridWidth + 1}/ ${gridHeight + 1} / ${gridWidth + 1} `,
            backgroundColor: 'grey',
            position: 'flex',
          }}
        >
          <Slider vertical />
        </div>
        <div
          style={{
            gridArea: `${gridHeight + 1} / 1 / ${gridHeight + 1} / ${gridWidth + 1}`,
            backgroundColor: 'grey',
          }}
        >
          <Slider />
        </div>
      </div>
    );
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
    arr.push('10px');
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
    return (
      <div
        key={'cell' + height + width}
        style={{
          backgroundColor: 'white',
          gridColumnStart: width + 1,
          gridColumnEnd: width + 2,
          gridRowStart: height + 1,
          gridRowEnd: height + 2,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <div style={{ fontSize: '100%' }}>{cellData.winner}</div>
      </div>
    );
  };

  // return <div style={{ display: 'flex', justifyContent: 'center' }}>{JSON.stringify(moduleState)}</div>;
  return <div style={{ display: 'flex', justifyContent: 'center' }}>{buildGridDisplay(mockGrid)}</div>;
}
