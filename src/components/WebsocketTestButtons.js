import React from 'react';
import { client } from '../'

export function WebsocketTestButtons(props) {
  function allClick() {
    console.log('ALL CLICK')
    const params = { source: 'crowd' }
    client.send(JSON.stringify({ action: 'all', params }))
  }

  function randClick() {
    console.log('RANDOM CLICK')
    const params = { source: 'crowd' }
    console.log('PARAMS', params)
    client.send(JSON.stringify({ action: 'random', params }))
  }

  function sourceClick() {
    console.log('SOURCE CLICK')
    const params = { source: 'crowd' }
    client.send(JSON.stringify({ action: 'source', params }))
  }

  return (
    <div>
      <h3>Websocket test buttons</h3>
      <button onClick={() => allClick()}>To All</button>
      <button onClick={() => randClick()}>To Random</button>
      <button onClick={() => sourceClick()}>To Source</button>
    </div>
  )
}