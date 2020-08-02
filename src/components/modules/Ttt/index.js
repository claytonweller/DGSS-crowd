import React from 'react';
import { TttLobby } from './TttLobby';
import { TttGame } from './TttGame';
import { TttGrid } from './TttGrid';

export function Ttt({ moduleState, sendInteraction }) {
  let display = <div>Look at the stage.</div>;
  // let display = <TttGrid moduleState={moduleState} sendInteraction={sendInteraction}></TttGrid>;
  if (moduleState.step === 'lobby') display = <TttLobby moduleState={moduleState} />;
  if (moduleState.step === 'in-progress')
    display = <TttGame moduleState={moduleState} sendInteraction={sendInteraction} />;
  return <div>{display}</div>;
}
