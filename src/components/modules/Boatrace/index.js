import React from 'react';

export function Boatrace({ moduleState, sendInteraction }) {
  let display = (
    <div>
      <i>Look at the stage</i>
    </div>
  );

  const boarding = () => {
    const boats = moduleState.boats.map((boat, i) => {
      return (
        <button onClick={() => sendInteraction('boatrace-board-boat', { boatId: boat.id })} key={'boat' + i}>
          Boat {boat.name}
        </button>
      );
    });

    const boatFeedback = moduleState.myBoat
      ? `You are in: boat #${moduleState.myBoat.name}`
      : "You aren't in a boat yet";
    return (
      <div>
        <div>Pick a boat</div>
        {boats}
        <div>{boatFeedback}</div>
      </div>
    );
  };

  if (moduleState.step === 'boarding') display = boarding();

  return <div>{display}</div>;
}
