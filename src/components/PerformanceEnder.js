import React from 'react'
import { client } from '..'
export function PerformanceEnder({ performance }) {
  function endPerformanceClick() {
    const params = {
      action: "end-performance",
      params: performance
    }
    console.log('THAT\'S ALL FOLKS!')
    client.send(JSON.stringify(params))
  }
  return (
    <div>
      <h3>End Performance?</h3>
      <button onClick={() => endPerformanceClick()}>END IT!</button>
    </div>
  )
}