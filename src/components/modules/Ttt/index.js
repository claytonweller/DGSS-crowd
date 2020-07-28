import React from 'react';
import { TttLobby } from './TttLobby';
import { TttGame } from './TttGame';
import { TttGrid } from './TttGrid';

export function Ttt({ moduleState }) {
  // let display = <div>Look at the stage.</div>;
  let display = <TttGrid></TttGrid>;
  if (moduleState.step === 'lobby') display = <TttLobby moduleState={moduleState} />;
  if (moduleState.step === 'in-progress') display = <TttGame moduleState={moduleState} />;
  return <div>{display}</div>;
}
