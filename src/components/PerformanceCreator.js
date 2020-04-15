import React from 'react'
import { client } from '..'
export function PerformanceCreator(params) {

  function createPerformanceClick() {
    const params = {
      action: "create-performance",
      params: {}
    }
    console.log('GET READY TO PERFORM!')
    client.send(JSON.stringify(params))
  }
  return (
    <div>
      <h3>Create Performance?</h3>
      <button onClick={() => createPerformanceClick()}>GO!</button>
    </div>
  )
}