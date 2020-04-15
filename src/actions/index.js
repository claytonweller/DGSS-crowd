import { client } from '../index'

export const manageMessage = async (message, component) => {
  let action = Object.keys(actionHash).includes(message.action)
    ? actionHash[message.action]
    : actionHash.defaultAction

  try {
    return await action(message.params, component)
  } catch (e) {
    console.error(e)
  }
}

const actionHash = {
  'local-server': localServer,
  'conn-update': connectionUpdate,
  'performance-created': performanceCreated,
  'performance-ended': performanceEnded,
  defaultAction
}

async function defaultAction(params, component) { console.log('DEFAULT \n', params, component.state) }

async function performanceCreated(params, component) {
  console.log('Performance Created \n', params)
  component.setState({ performance: params })
}

async function performanceEnded(parms, component) {
  console.log('Performance Ended')
  component.setState({ performance: {} })
}

async function localServer(params, component) {
  console.log('local-server\n', params)
  const sendParams = {
    source: 'crowd'
  }
  client.send(JSON.stringify({ action: 'connect-source', params: sendParams }))
  component.setState({ currentConn: params })
}

async function connectionUpdate(params, component) {
  console.log('conn-update\n', params)
  component.setState({ currentConn: params })
}