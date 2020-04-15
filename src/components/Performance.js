import React from 'react'
import { PerformanceCreator } from "./PerformanceCreator";
import { PerformanceEnder } from './PerformanceEnder';

export function Performance({ performance }) {
  let display = (<PerformanceCreator />)
  if (performance.id) {
    const perfData = JSON.stringify(performance)
    display = (
      <div>
        <PerformanceEnder performance={performance} />
        {perfData}
      </div>
    )
  }
  return (
    <div>
      {display}
    </div>
  )
}