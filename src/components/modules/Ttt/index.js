import React from 'react';
import { TttLobby } from './TttLobby';

export function Ttt({ moduleState }) {
  let display = <div>Look at the stage.</div>;
  if (moduleState.step === 'lobby') display = <TttLobby moduleState={moduleState} />;
  return <div>{display}</div>;
}
