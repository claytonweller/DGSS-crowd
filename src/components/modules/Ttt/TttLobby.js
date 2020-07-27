import React from 'react';

export function TttLobby({ moduleState }) {
  return (
    <div>
      <div>You are on team!</div>
      <div style={{ fontSize: '90vw' }}>{moduleState.team}</div>
    </div>
  );
}
