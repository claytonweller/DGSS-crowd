import React from 'react';
import { NameForm } from './NameForm';

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
  if (moduleState.step === 'boarding-over') display = <div>Boarding is complete</div>;

  const meetYourCoxswain = () => {
    const crew = (
      <div>
        <div>You are Crew</div>
        <div>{moduleState.boat.captain_name} is your coxswain!</div>
      </div>
    );

    const coxswain = (
      <div>
        <div>You are Coxswain</div>
        <div>Say hi to your crew!</div>
      </div>
    );

    const role = moduleState.youAreCoxswain ? coxswain : crew;

    return (
      <div>
        <h3>{`Boat #${moduleState.boat.name}`}</h3>
        {role}
      </div>
    );
  };

  if (moduleState.step === 'meet-your-coxswain') display = meetYourCoxswain();

  const openForNaming = () => {
    const crew = (
      <div>
        <div>Name Your Boat</div>
        <div>Give {moduleState.boat.captain_name} your ideas!</div>
      </div>
    );

    const coxswain = (
      <div>
        <NameForm moduleState={moduleState} sendInteraction={sendInteraction} />
      </div>
    );

    const role = moduleState.youAreCoxswain ? coxswain : crew;
    const { name } = moduleState.boat;
    const displayedName = isNaN(parseInt(name)) ? `Your Boat is named ${name}!` : `Boat #${name}`;

    return (
      <div>
        <h3>{displayedName}</h3>
        {role}
      </div>
    );
  };

  if (moduleState.step === 'open-for-naming') display = openForNaming();

  const namingClosed = () => {
    return (
      <div>
        <h3>You are aboard</h3>
        <h2>{moduleState.boat.name}</h2>
      </div>
    );
  };

  if (moduleState.step === 'naming-closed') display = namingClosed();

  const racing = () => {
    const coxswain = () => {
      const commands = moduleState.command.map((c, i) => {
        return (
          <div key={c.name + i}>
            Name: {c.name} - Rowed: {c.hasRowed ? 'Yup' : 'Not Yet'}
          </div>
        );
      });
      return <div>{commands}</div>;
    };

    const crew = (
      <button onClick={() => sendInteraction('boatrace-stroke', { boatId: moduleState.boat.id })}>STROKE!</button>
    );

    const role = moduleState.command ? coxswain() : crew;

    return (
      <div>
        <h3>RACING!</h3>
        {role}
      </div>
    );
  };

  if (moduleState.step === 'racing') display = racing();

  const raceEnded = () => {
    return (
      <div>
        <h3>Race Complete!</h3>
        <div>
          {moduleState.boat.name} came in {moduleState.podiumPosition} place!
        </div>
      </div>
    );
  };

  if (moduleState.step === 'race-ended') display = raceEnded();

  return <div>{display}</div>;
}
