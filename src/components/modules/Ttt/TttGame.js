import React from 'react';
import { TttGrid } from './TttGrid';

export function TttGame({ moduleState }) {
  return (
    <div>
      <TttGrid moduleState={moduleState} />
    </div>
  );
}
