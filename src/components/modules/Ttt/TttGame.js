import React from 'react';
import { TttGrid } from './TttGrid';

export function TttGame({ moduleState, sendInteraction }) {
  return (
    <div>
      <TttGrid moduleState={moduleState} sendInteraction={sendInteraction} />
    </div>
  );
}
